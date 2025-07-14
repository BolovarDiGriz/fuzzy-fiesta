function openTelegram() {
  window.open(" https://t.me/Somnium_R ", "_blank");
}

async function getSubscribers(channelUsername) {
  try {
    const response = await fetch(` https://t.me/ ${channelUsername}?embed=1`);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const subscriberElem = doc.querySelector('.tgme_page_extra');

    if (subscriberElem) {
      const countText = subscriberElem.textContent.trim();

      // Убираем лишнее, оставляем только число
      const count = countText.replace(/[^0-9]/g, '');

      document.getElementById('subscriber-count').textContent =
        `${count} subscribers`;
    } else {
      document.getElementById('subscriber-count').textContent =
        'Не удалось загрузить данные';
    }
  } catch (e) {
    console.error(e);
    document.getElementById('subscriber-count').textContent =
      'Ошибка загрузки данных';
  }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const channelUsername = 'Somnium_R'; // замени на свой
  getSubscribers(channelUsername);
});