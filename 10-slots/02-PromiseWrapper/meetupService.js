import meetups from './meetups.json';

/**
 * Получение данных митапа по Meetup ID с API
 * @param {Number} meetupId
 * @return {Promise<Object>} - Данные митапа
 * @throws {Error} - Ошибка получения данных митапа
 */
export async function fetchMeetupById(meetupId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const meetup = meetups.find((meetup) => meetup.id === meetupId);
      if (!meetup) {
        reject(new Error('Not found'));
      } else {
        resolve(meetup);
      }
    }, 1000);
  });
}
