import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  try {
    const res = await fetch(url, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return { status: res.status, data, headers: res.headers };
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

async function runAuthHardeningTests() {
  console.log('\n======================================================');
  console.log('       GIGMATCH AUTHENTICATION HARDENING TEST SUITE    ');
  console.log('======================================================\n');

  const results = [];
  function record(testNum, testName, passed, details = '') {
    results.push({ testNum, testName, passed, details });
    const mark = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`[${testNum}] ${mark} - ${testName}`);
    if (details) console.log(`    ↳ ${details}`);
  }

  const timestamp = Date.now();
  const customerEmail = `cust_hardened_${timestamp}@test.com`;
  const workerEmail = `worker_hardened_${timestamp}@test.com`;
  const strongPassword = 'StrongPass@2026!';

  let customerToken = null;
  let customerId = null;
  let workerToken = null;
  let workerId = null;

  // 1. Customer registration -> PASS
  const res1 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Hardened Customer',
      email: customerEmail,
      password: strongPassword,
      phone: '9876543210',
      role: 'customer'
    }
  });
  const pass1 = res1.status === 201 && !!res1.data?.token && res1.data?.user?.role === 'customer';
  if (pass1) {
    customerToken = res1.data.token;
    customerId = res1.data.user._id;
  }
  record(1, 'Customer registration → PASS', pass1, `Status: ${res1.status}, Role: ${res1.data?.user?.role}`);

  // 2. Worker registration -> PASS
  const res2 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Hardened Worker',
      email: workerEmail,
      password: strongPassword,
      phone: '9876543211',
      role: 'worker'
    }
  });
  const pass2 = res2.status === 201 && !!res2.data?.token && res2.data?.user?.role === 'worker';
  if (pass2) {
    workerToken = res2.data.token;
    workerId = res2.data.user._id;
  }
  record(2, 'Worker registration → PASS', pass2, `Status: ${res2.status}, Role: ${res2.data?.user?.role}`);

  // 3. Admin registration attempt -> BLOCKED
  const res3 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Sneaky Attacker',
      email: `admin_attempt_${timestamp}@test.com`,
      password: strongPassword,
      role: 'admin'
    }
  });
  const pass3 = res3.status === 400;
  record(3, 'Admin registration attempt → BLOCKED', pass3, `Status: ${res3.status}, Message: ${res3.data?.message}`);

  // 4. Duplicate email -> proper error
  const res4 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Duplicate User',
      email: customerEmail,
      password: strongPassword,
      role: 'customer'
    }
  });
  const pass4 = res4.status === 409;
  record(4, 'Duplicate email → proper error (409 Conflict)', pass4, `Status: ${res4.status}`);

  // 5. Weak password -> BLOCKED
  const res5 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Weak Pass User',
      email: `weakpass_${timestamp}@test.com`,
      password: 'password123', // missing uppercase & special char
      role: 'customer'
    }
  });
  const pass5 = res5.status === 400;
  record(5, 'Weak password → BLOCKED (400 Bad Request)', pass5, `Status: ${res5.status}, Message: ${res5.data?.message}`);

  // 6. Invalid email -> BLOCKED
  const res6 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Bad Email User',
      email: 'not-a-valid-email',
      password: strongPassword,
      role: 'customer'
    }
  });
  const pass6 = res6.status === 400;
  record(6, 'Invalid email → BLOCKED (400 Bad Request)', pass6, `Status: ${res6.status}, Message: ${res6.data?.message}`);

  // 7. Invalid phone -> BLOCKED
  const res7 = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Bad Phone User',
      email: `badphone_${timestamp}@test.com`,
      password: strongPassword,
      phone: '12345', // invalid phone number
      role: 'customer'
    }
  });
  const pass7 = res7.status === 400;
  record(7, 'Invalid phone → BLOCKED (400 Bad Request)', pass7, `Status: ${res7.status}, Message: ${res7.data?.message}`);

  // 8. Wrong password -> 401
  const res8 = await request('/auth/login', {
    method: 'POST',
    body: {
      email: customerEmail,
      password: 'WrongPassword@999'
    }
  });
  const pass8 = res8.status === 401;
  record(8, 'Wrong password → 401 Unauthorized', pass8, `Status: ${res8.status}, Message: ${res8.data?.message}`);

  // 9. Nonexistent user -> 401
  const res9 = await request('/auth/login', {
    method: 'POST',
    body: {
      email: 'nonexistent_account_xyz@nowhere.com',
      password: strongPassword
    }
  });
  const pass9 = res9.status === 401;
  record(9, 'Nonexistent user → 401 Unauthorized', pass9, `Status: ${res9.status}, Message: ${res9.data?.message}`);

  // 10. Inactive user login -> BLOCKED
  const res10 = await request('/auth/login', {
    method: 'POST',
    body: {
      email: 'inactive@gigmatch.com',
      password: 'password123'
    }
  });
  const pass10 = res10.status === 401;
  record(10, 'Inactive user login → BLOCKED (401)', pass10, `Status: ${res10.status}, Message: ${res10.data?.message}`);

  // 11. Worker registration creates Worker profile -> PASS
  const pass11 = !!res2.data?.workerProfile && res2.data?.workerProfile.isVerified === false;
  record(11, 'Worker registration creates Worker profile → PASS', pass11, `Profile ID: ${res2.data?.workerProfile?._id}, isVerified: ${res2.data?.workerProfile?.isVerified}`);

  // 12. Customer registration does not create Worker profile -> PASS
  const pass12 = res1.data?.workerProfile === undefined;
  record(12, 'Customer registration does not create Worker profile → PASS', pass12, `Worker profile: ${res1.data?.workerProfile}`);

  // 14. Invalid JWT -> 401
  const res14 = await request('/auth/me', {
    headers: { Authorization: 'Bearer forged.malformed.jwt.token' }
  });
  const pass14 = res14.status === 401;
  record(14, 'Invalid JWT → 401 Unauthorized', pass14, `Status: ${res14.status}`);

  // 15. Protected route without token -> 401
  const res15 = await request('/auth/me');
  const pass15 = res15.status === 401;
  record(15, 'Protected route without token → 401 Unauthorized', pass15, `Status: ${res15.status}`);

  // 16. Existing RBAC remains functional
  const adminLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'admin@gigmatch.com', password: 'password123' }
  });
  const adminToken = adminLogin.data?.token;

  const adminStatsWithAdmin = await request('/admin/stats', {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const adminStatsWithCust = await request('/admin/stats', {
    headers: { Authorization: `Bearer ${customerToken}` }
  });

  const pass16 = adminStatsWithAdmin.status === 200 && adminStatsWithCust.status === 403;
  record(16, 'Existing RBAC remains functional', pass16, `Admin access: ${adminStatsWithAdmin.status}, Customer denied: ${adminStatsWithCust.status}`);

  // 17. Mock authentication fallback -> completely removed
  const clientAuthPath = path.resolve(__dirname, '../../client/src/services/authService.js');
  const clientAuthContent = fs.readFileSync(clientAuthPath, 'utf8');
  const hasMockTokens = clientAuthContent.includes('mock-jwt-token') || clientAuthContent.includes('mockUser');
  const pass17 = !hasMockTokens;
  record(17, 'Mock authentication fallback → completely removed', pass17, pass17 ? 'No mock tokens or mock users in client authService' : 'Found mock user/token traces');

  // 13. Login brute-force / rate limit -> BLOCKED (tested last so it does not block preceding tests)
  console.log('    Testing auth rate limiter with rapid attempts...');
  let hitRateLimit = false;
  let rateLimitStatus = 0;
  for (let i = 0; i < 30; i++) {
    const resRL = await request('/auth/login', {
      method: 'POST',
      body: { email: 'bruteforce@test.com', password: 'password123' }
    });
    if (resRL.status === 429) {
      hitRateLimit = true;
      rateLimitStatus = 429;
      break;
    }
  }
  record(13, 'Login brute-force/rate limit → BLOCKED (429)', hitRateLimit, `Blocked with status ${rateLimitStatus}`);

  // Sort and print summary in exact 1..17 order
  results.sort((a, b) => a.testNum - b.testNum);

  console.log('\n======================================================');
  console.log('                 FINAL TEST SUMMARY                   ');
  console.log('======================================================');
  results.forEach(r => {
    console.log(`${r.passed ? '✅' : '❌'} Test ${r.testNum.toString().padStart(2, ' ')}: ${r.testName}`);
  });
  const totalPassed = results.filter(r => r.passed).length;
  const totalFailed = results.filter(r => !r.passed).length;
  console.log('------------------------------------------------------');
  console.log(`TOTAL TESTS: ${results.length} | PASSED: ${totalPassed} | FAILED: ${totalFailed}`);
  console.log('======================================================\n');

  process.exit(totalFailed > 0 ? 1 : 0);
}

runAuthHardeningTests();
