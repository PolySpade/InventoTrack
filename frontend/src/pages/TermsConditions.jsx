import React from 'react'

const TermsConditions = () => {
  return (
    <div className="m-5 flex flex-wrap justify-center mt-24">
      <div className="w-full bg-neutral p-6 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <p>
          Welcome to InventoTrack. By accessing or using our inventory tracking app ("App"), you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before using the App. If you do not agree to these Terms, you must not use the App.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">User Accounts</h2>
        <ul className="list-disc list-inside">
          <li>Registration: Provide accurate information during registration.</li>
          <li>Responsibility: Keep your account credentials confidential and secure.</li>
          <li>Restrictions: Do not use another user's account or share your credentials.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Use of the App</h2>
        <ul className="list-disc list-inside">
          <li>Compliance: Use the App only for lawful purposes.</li>
          <li>Prohibited Activities: Do not violate laws, restrict others' use, or impersonate others.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Intellectual Property</h2>
        <ul className="list-disc list-inside">
          <li>Ownership: All content and functionality are owned by InventoTrack.</li>
          <li>License: You have a limited, non-transferable license to use the App.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Data and Privacy</h2>
        <ul className="list-disc list-inside">
          <li>Data Collection: We collect and use data as described in our Privacy Policy.</li>
          <li>Data Security: We implement measures to protect your data but cannot guarantee absolute security.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Contact Us</h2>
        <p>
          For questions, contact us at <a href="mailto:support@inventotrack.com" className="text-blue-500 underline">support@inventotrack.com</a>.
        </p>

        <p className="mt-4">
          By using the InventoTrack App, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
        </p>
      </div>
    </div>
  )
}

export default TermsConditions
