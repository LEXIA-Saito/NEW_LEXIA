// Test secure contact API
const testSecureContact = async () => {
  const testData = {
    name: "セキュリティテストユーザー",
    company: "テスト会社",
    email: "security-test@example.com",
    phone: "090-1234-5678",
    inquiryType: "question",
    services: ["corporate"],
    otherService: "",
    budget: "~50",
    due: "テスト用",
    url: "https://test.example.com",
    details: "セキュアなContact APIのテストです。",
    attachment: null,
    preferredContact: ["email"]
  };

  console.log('🔒 Testing secure contact API...\n');

  try {
    // Test main contact API (secure version)
    console.log('1️⃣ Testing /api/contact (secure version)');
    const response1 = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', result1);
    console.log('Headers:', Object.fromEntries(response1.headers.entries()));

    if (response1.ok) {
      console.log('✅ Main contact API test passed!');
    } else {
      console.log('❌ Main contact API test failed');
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Test dedicated secure contact API
    console.log('2️⃣ Testing /api/secure-contact');
    const response2 = await fetch('http://localhost:3000/api/secure-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', result2);

    if (response2.ok) {
      console.log('✅ Secure contact API test passed!');
    } else {
      console.log('❌ Secure contact API test failed');
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Test rate limiting
    console.log('3️⃣ Testing rate limiting (3 rapid requests)');
    for (let i = 1; i <= 3; i++) {
      const rateLimitResponse = await fetch('http://localhost:3000/api/secure-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...testData, name: `Rate Limit Test ${i}`})
      });

      const rateLimitResult = await rateLimitResponse.json();
      console.log(`Request ${i}: Status ${rateLimitResponse.status}, Remaining: ${rateLimitResult.remaining || 'N/A'}`);
    }

    console.log('\n🎉 All security tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testSecureContact();
