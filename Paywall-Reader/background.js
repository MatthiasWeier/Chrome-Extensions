chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.startsWith('http')) {
      const archiveApiUrl = 'https://archive.ph/submit/';
      const originalUrl = tab.url;
  
      console.log(`Archiving URL: ${originalUrl}`);
  
      fetch(archiveApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `url=${encodeURIComponent(originalUrl)}`
      })
      .then(response => response.text())
      .then(data => {
        // Parse the response to find the archive URL
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const archiveUrlElement = doc.querySelector('a#submiturl');
        
        if (archiveUrlElement) {
          const archiveUrl = archiveUrlElement.href;
          console.log(`Archived URL: ${archiveUrl}`);
          chrome.tabs.update(tab.id, { url: archiveUrl });
        } else {
          console.error('Archive URL not found in response');
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'images/icon128.png',
            title: 'Paywall Reader',
            message: 'Failed to retrieve archived URL'
          });
        }
      })
      .catch(error => {
        console.error('Error archiving URL:', error);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon128.png',
          title: 'Paywall Reader',
          message: `Error archiving URL: ${error.message}`
        });
      });
    } else {
      console.error('Invalid tab URL');
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon128.png',
        title: 'Paywall Reader',
        message: 'Invalid tab URL'
      });
    }
  });