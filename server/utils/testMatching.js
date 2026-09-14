import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import { rankMatchingWorkers } from '../services/matchingService.js';
import Worker from '../models/Worker.js';

const runMatchingTests = async () => {
  try {
    await connectDB();
    console.log('\n--- STARTING AI MATCHING ENGINE VERIFICATION SUITE ---\n');

    // Test 1: Emergency Wiring Repair in Jaipur (Should rank Rajesh Sharma #1)
    console.log('>>> TEST 1: Request for "Emergency wiring repair" in "Jaipur" with budget 50');
    const res1 = await rankMatchingWorkers({
      service: 'electrician',
      description: 'Emergency wiring repair',
      location: 'Jaipur',
      budget: 50
    });

    console.log(`Matched ${res1.length} verified workers:`);
    res1.forEach((m, idx) => {
      console.log(`  #${idx + 1}: ${m.worker.title} (${m.worker.location})`);
      console.log(`      Score: ${m.matchScore}% | Available: ${m.worker.isAvailable} | Verified: ${m.worker.isVerified}`);
      console.log(`      Breakdown:`, m.breakdown);
    });

    // Verify unverified worker is NOT in results
    const unverifiedIncluded = res1.some(m => m.worker.isVerified === false);
    console.log(`\n  [PASS/FAIL] Excludes unverified workers: ${!unverifiedIncluded ? 'PASS ✓' : 'FAIL ✗'}`);

    // Verify unavailable worker is ranked lower due to availability points
    const rajesh = res1.find(m => m.worker.title.includes('Senior Emergency Electrician'));
    const vikram = res1.find(m => m.worker.title.includes('Residential Electrician'));
    if (rajesh && vikram) {
      console.log(`  [PASS/FAIL] Available worker (${rajesh.matchScore}%) outranks unavailable worker (${vikram.matchScore}%): ${rajesh.matchScore > vikram.matchScore ? 'PASS ✓' : 'FAIL ✗'}`);
    }

    // Test 2: Plumbing request (Should rank David Rodriguez #1)
    console.log('\n>>> TEST 2: Request for "Plumbing leak fix"');
    const res2 = await rankMatchingWorkers({
      service: 'plumbing',
      description: 'Need pipe leak detection and repair'
    });
    console.log(`Top match for plumbing: ${res2[0]?.worker?.title} (Score: ${res2[0]?.matchScore}%)`);
    console.log(`  [PASS/FAIL] Category/skill accuracy: ${res2[0]?.worker?.categoryName?.includes('Plumbing') ? 'PASS ✓' : 'FAIL ✗'}`);

    console.log('\n--- MATCHING VERIFICATION COMPLETE ---');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    process.exit();
  }
};

runMatchingTests();
