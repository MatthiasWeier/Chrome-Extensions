document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('bypass-paywall');
    if (button) {
      button.addEventListener('click', () => {
        console.log('Button clicked');  // Debugging log
  
        // Generate current timestamp in the format YYYYMMDDHHMMSS
        const pad = (num) => num.toString().padStart(2, '0');
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = pad(now.getUTCMonth() + 1);
        const day = pad(now.getUTCDate());
        const hours = pad(now.getUTCHours());
        const minutes = pad(now.getUTCMinutes());
        const seconds = pad(now.getUTCSeconds());
        const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
  
        console.log('Generated timestamp:', timestamp);  // Debugging log
  
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];
          const baseUrl = "https://archive.ph/";
          const newUrl = `${baseUrl}${timestamp}/${tab.url}`;
  
          console.log('New URL:', newUrl);  // Debugging log
  
          // Redirect the current tab to the new URL
          chrome.tabs.update(tab.id, { url: newUrl }, () => {
            console.log('Tab updated');  // Debugging log
          });
        });
      });
    } else {
      console.error('Button with ID "bypass-paywall" not found');
    }

    // Add event listener for the PaywallReader button
    const paywallReaderButton = document.getElementById('paywallreader-link');
    if (paywallReaderButton) {
      paywallReaderButton.addEventListener('click', openPaywallReader);
    } else {
      console.error('Button with ID "paywallreader-link" not found');
    }
});

function openPaywallReader() {
  chrome.tabs.create({ url: 'https://paywallreader.com' });
}

  