const bcrypt = require("bcrypt");

async function login() {

    const password = "123456";

    const hash =
        await bcrypt.hash(password,10);

    const result =
        await bcrypt.compare(
            password,
            hash
        );

    console.log(result);

}

login();