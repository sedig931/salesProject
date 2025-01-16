
export default function (e) {
    console.log('here for show or hide spacific menue..');

    if (e.type === 'mouseleave' && e.target.classList.contains('delevery-div')) {
        return
    }
    if (e.type === 'mouseenter') {
        controllViewUsers(e);
        return;
    }

    const _menuecontainers = document.querySelectorAll(".menue-container");
    const _viewUsersDiv = document.querySelector(".view-users-div");
    const _settDiv = document.querySelector(".sett-div");
    if (e.target.classList.contains("menu"))
        e.target.nextElementSibling.classList.toggle("add-hidden");


    let menue;

    _menuecontainers.forEach((m) => {
        if (m === e.target) menue = m;
    });
    // console.log(menue);
    controllViewUsers(e);

    if (menue) {
        if (menue.classList.contains("plus-menue")) {
            setTimeout(() => {
                if (_viewUsersDiv.classList.contains("active-menue")) {
                    menue.classList.remove("active-menue");
                } else {
                    menue.classList.add("add-hidden");
                    menue.classList.remove("active-menue");
                }
            }, 500);
            return;
        }
        setTimeout(() => {
            menue.classList.add("add-hidden");
            if (menue.classList.contains("view-users-div")) {
                menue.classList.remove("active-menue");
                setTimeout(() => {
                    if (!_settDiv.classList.contains("active-menue")) {
                        _settDiv.classList.add("add-hidden");
                    }
                }, 300);
            }
        }, 300);
    }
}


const controllViewUsers = function (e) {
    const _menuecontainers = document.querySelectorAll(".menue-container");
    const _viewUsersDiv = document.querySelector(".view-users-div");
    const _settDiv = document.querySelector(".sett-div");
    if (e.target === _viewUsersDiv) _viewUsersDiv.classList.add('active-menue');
    else if (e.target === _settDiv) _settDiv.classList.add('active-menue');
    else {
        if (e.type === 'mouseenter') {
            _viewUsersDiv.classList.remove('add-hidden');
        }
        else {
            setTimeout(() => {
                if (!_viewUsersDiv.classList.contains('active-menue')) {
                    _viewUsersDiv.classList.add('add-hidden');
                }
            }, 500);
        }
    }
}


