import { name } from '../index';
////////////////////////////////////////////////////////
// name
////////////////////////////////////////////////////////
xtest("name", function () {
    expect(name('#000000')).toStrictEqual('Black');
    expect(name('#ffffff')).toStrictEqual('White');
});
//# sourceMappingURL=name.test.js.map