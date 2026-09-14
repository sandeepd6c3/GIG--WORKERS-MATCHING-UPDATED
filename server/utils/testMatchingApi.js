const BASE_URL = 'http://localhost:5000/api/v1/matching/workers';

const cases = [
  {
    name: '1. Electrician + Jaipur + budget 50',
    payload: {
      service: 'electrician',
      description: 'Emergency wiring repair',
      location: 'Jaipur',
      budget: 50
    }
  },
  {
    name: '2. Plumber + Jaipur',
    payload: {
      service: 'plumber',
      description: 'Pipe leakage repair',
      location: 'Jaipur'
    }
  },
  {
    name: '3. Electrician + Delhi',
    payload: {
      service: 'electrician',
      description: 'Panel installation and wiring',
      location: 'Delhi',
      budget: 50
    }
  },
  {
    name: '4. An unavailable worker scenario',
    payload: {
      service: 'electrician',
      description: 'Residential electrical check',
      location: 'Jaipur',
      date: '2026-09-15'
    }
  },
  {
    name: '5. An unverified worker scenario',
    payload: {
      service: 'electrician',
      description: 'Wiring assistance',
      location: 'Jaipur'
    }
  }
];

const runHttpTests = async () => {
  console.log('================================================================');
  console.log('     TESTING LIVE HTTP API: POST /api/v1/matching/workers       ');
  console.log('================================================================\n');

  for (const tc of cases) {
    console.log(`>>> EXECUTING TEST: [${tc.name}]`);
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tc.payload)
      });

      const data = await response.json();
      console.log(`    HTTP Status: ${response.status} ${response.statusText}`);
      console.log(`    Response Success: ${data.success}`);
      console.log(`    Total Matches Returned: ${data.count}`);

      if (data.matches && data.matches.length > 0) {
        const top = data.matches[0];
        console.log(`    Top Match: ${top.worker.title} (${top.worker.location})`);
        console.log(`    Match Score: ${top.matchScore}%`);
        console.log(`    Score Breakdown:`, top.breakdown);

        // Verification check: Are unverified workers excluded?
        const hasUnverified = data.matches.some(m => m.worker.isVerified === false);
        console.log(`    Unverified workers excluded: ${!hasUnverified ? 'PASS ✓' : 'FAIL ✗'}`);

        // Sorted check: Is list strictly descending?
        let isSorted = true;
        for (let i = 0; i < data.matches.length - 1; i++) {
          if (data.matches[i].matchScore < data.matches[i + 1].matchScore) {
            isSorted = false;
            break;
          }
        }
        console.log(`    Results Sorted By Highest Score: ${isSorted ? 'PASS ✓' : 'FAIL ✗'}`);
      }

      console.log('');
    } catch (err) {
      console.error(`    FAILED to call endpoint:`, err.message);
    }
  }

  console.log('================================================================');
  console.log('                 HTTP API TEST SUITE COMPLETE                   ');
  console.log('================================================================');
};

runHttpTests();
