export default function convertDate (date) {
  let day;
  const order = new Date(date).toLocaleString('ru-RU', {dateStyle: 'short'}).split('.');
  const current = new Date().toLocaleString('ru-RU', {dateStyle: 'short'}).split('.');
  if (order[1] === current[1] && order[2] === current[2]) {
    const orderDay = parseInt(order[0]);
    const currentDay = parseInt(current[0]);
    if (orderDay === currentDay) day = 'Сегодня';
    if (orderDay + 1 === currentDay) day = 'Вчера';
    for (let i = 2; i < 5 ; i++) {
      if (orderDay + i === currentDay) day = `${i} дня назад`;
    }
  }
  if (!day) day = new Date(date).toLocaleString('ru-RU', { dateStyle: 'short' });
  const time = new Date(date).toLocaleString('ru-RU', {timeStyle: 'short'});
  const timeZone = new Date(date).toLocaleString('ru-RU', {timeZoneName: 'short'});
  return `${day}, ${time} ${timeZone.split(' ')[2]}`;
}
