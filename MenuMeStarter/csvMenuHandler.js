const fastcsv = require('fast-csv');
const parse = fastcsv.parse;
const fs = require("fs");

const get = (menu) => {
    return new Promise((resolve, reject) => {
        let result = [];
        fs.createReadStream(menu)
            .pipe(parse({headers: false}))
            .on('error', error => console.log(error))
            .on('data', row => result.push(row))
            .on('end', rowCount => {
                resolve(result);
            });
    });
}

const build = (menu) => {
    return get(menu).then(result => {
        let menuObject = {};

        result.forEach(item => {
            const name = item[1];
            const category = item[0];
            const price = item[3];
            const portion = item[2];

            if (!menuObject.hasOwnProperty(category)) {
                menuObject[category] = [{
                    'name': name,
                    'price': price,
                    'portion': portion
                }];
            } else {
                menuObject[category].push({
                    'name': name,
                    'price': price,
                    'portion': portion
                });
            }
        });
        return menuObject;
    });
}

const convertToHtml = (menu) => {
    return build(menu).then(menuObject => {
        let resultStr = "";
        for (let [key, value] of Object.entries(menuObject)) {
            resultStr +=
            `<tr class="meal-header">
                <th colspan="3">${key.replace(/^\w/, (c) => c.toUpperCase())} Items</th>
             </tr>`;

            resultStr += `<tbody class="meal-items">`;

            for (let item of value) {

                resultStr +=
                `<tr class="item-row">
                    <td class="price">${item.price}</td>
                    <td class="item">${item.name}</td>
                    <td class="amount">${item.portion}</td>
                 </tr>`;
            }

            resultStr += `</tbody>`;
        }

        return resultStr;
    });
}

module.exports = {
    get, build, convertToHtml
}