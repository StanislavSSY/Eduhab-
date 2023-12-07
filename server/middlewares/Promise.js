async function someRequst(elem, table) {
  return new Promise(async (resolve) => {
    const array = [];
    const data = await table.findAll({ where: { lessonid: elem } });
    const newdata = data.map((el) => el.get({ plain: true }));
    array.push(...newdata.map((item) => item.id));
    resolve(array);
  });
}

async function twoReq(elem, table) {
  const result = [];
  for (const el of elem) {
    const resu = await someRequst(el, table);
    result.push(...resu);
  }

  return result;
}

module.exports = { twoReq };
