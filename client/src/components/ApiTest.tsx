"use client";
import React, { useState } from 'react';
import { API_CONFIG, getApiUrl } from '@/api/config';

export default function ApiTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing...');
    
    try {
      console.log('=== API TEST DEBUG ===');
      console.log('URL:', getApiUrl(API_CONFIG.ENDPOINTS.REGISTER));
      console.log('Headers:', API_CONFIG.HEADERS);
      console.log('Environment check:');
      console.log('- NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
      console.log('- NEXT_PUBLIC_FRONTEND_SECRET_KEY:', process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY);
      console.log('========================');

      const testData = {
        email: 'test@exampleeee.com',
        name: 'Test User',
        password: '1234567890',
        confirm_password: '1234567890',
        is_company: false
      };

      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.REGISTER), {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(testData),
      });

      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        setTestResult(`Error: ${response.status} - ${errorData.message || response.statusText}`);
      } else {
        const result = await response.json();
        console.log('Success response:', result);
        setTestResult(`Success: ${result.message}`);
      }
    } catch (error: any) {
      console.error('Test error:', error);
      setTestResult(`Network Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white font-medium mb-2">API Connection Test</h3>
      <button
        onClick={testApiConnection}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>
      {testResult && (
        <div className="mt-2 p-2 bg-gray-700 rounded text-sm">
          <pre className="text-white">{testResult}</pre>
        </div>
      )}
    </div>
  );
}
