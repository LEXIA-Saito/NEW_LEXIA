// Test script for contact API endpoint
const testContactAPI = async () => {
  const testData = {
    name: "Test User",
    company: "Test Company",
    email: "test@example.com",
    phone: "090-1234-5678",
    inquiryType: "new",
    services: ["corporate"],
    otherService: "",
    budget: "~50",
    due: "1ヶ月以内",
    url: "https://example.com",
    details: "これはテスト用のお問い合わせです。",
    attachment: null,
    preferredContact: ["email"]
  };

  try {
    console.log('Testing contact API endpoint...');
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response statusText:', response.statusText);
    
    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (response.ok) {
      console.log('✅ Contact API test passed!');
    } else {
      console.log('❌ Contact API test failed');
    }
  } catch (error) {
    console.error('❌ Error testing contact API:', error.message);
  }
};

testContactAPI();