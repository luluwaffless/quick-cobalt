const api = typeof browser !== "undefined" ? browser : chrome;
api.action.onClicked.addListener(async (tab) => {
    const newTab = await api.tabs.create({ url: "https://cobalt.tools/" });
    api.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === newTab.id && info.status === 'complete') {
            api.tabs.onUpdated.removeListener(listener);
            api.scripting.executeScript({
                target: { tabId: newTab.id },
                func: (url) => {
                    const input = document.getElementById('link-area');
                    const button = document.getElementById('download-button');
                    if (input) {
                        input.value = url;
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                        if (button) button.click();
                    };
                },
                args: [ tab.url ]
            });
        };
    });
});