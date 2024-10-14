export const activeUser = {};
const authinticateManager = async function (phone, password) {
    try {
        await fetch(`http://localhost:300/manager/auth/phone&pass`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    phone: phone,
                    password: password
                }
            ),
            // credentials: 'include',


        }).then(res => res.json())
            .then(data => {
                activeUser.id = data._id,
                    activeUser.fname = data.fname,
                    activeUser.lname = data.lname,
                    activeUser.phone = data.phone,
                    activeUser.password = data.password
                activeUser.address = data.address,
                    activeUser.photo = data.photo,
                    activeUser.email = data.email
                activeUser.admin = data.admin
            });
    } catch (err) {
        // console.log(err.message);
        throw err;
    }
}

export const controllLogin = async function (phone, password) {
    // export default async function (e) {
    try {
        await authinticateManager(phone, password);

        // sessionStorage.setItem('manager', JSON.stringify(manager));

        return activeUser;

    } catch (err) {
        // console.log('here');
        // console.log(err.message);
        throw err;
    }
}

