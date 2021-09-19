// user class
class Users {
    // get new user parameters
    constructor(fname, lname, access, location, role, heartrate, stress, dehydration, healthYes, midRisk, highRisk, extremeRisk, riskYes, grouping, hourly, daily, weekly, monthly) {
        this.fname = fname;
        this.lname = lname;
        this.access = access;
        this.location = location;
        this.role = role;
        this.heartrate = heartrate;
        this.stress = stress;
        this.dehydration = dehydration;
        this.healthYes = healthYes;
        this.midRisk = midRisk;
        this.highRisk = highRisk;
        this.extremeRisk = extremeRisk;
        this.riskYes = riskYes;
        this.grouping = grouping;
        this.hourly = hourly;
        this.daily = daily;
        this.weekly = weekly;
        this.monthly = monthly;
    }
}

// UI class
class UI {
    static displayUsers() {
        const users = Store.getUsers();
        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user) {
        // get the container of the user list
        const list = document.querySelector('#user-list');
        const icons = document.createElement('div');

        icons.innerHTML = `
            <i class="material-icons" id="${user.fname}">account_circle</i>
            <label class="iconText">${user.fname}</label>
        `;

        list.appendChild(icons);
    }

    static deleteUser(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showNotification(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('#addAccountContainer');
        const form = document.querySelector('#thisThing');
        container.insertBefore(div, form);

        // remove not in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clear() {
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
    }
}

// store class
class Store {
    // get user info from local storage
    static getUsers() {
        let users;
        if(localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    // add user info to local storage
    static addUser(user) {
        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // remove users from local storage
    static removeUser(username) {
        const users = Store.getUser();
        
        users.foreach((user, index) => {
            if(user.username === username) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// event to display
document.addEventListener('DOMContentLoaded', UI.displayUsers);

// event to add user
document.querySelector('#addUser').addEventListener('click', (e) => {
    e.preventDefault();
    var user;

    // Validate
    if(document.querySelector('#fname').value === '' || document.querySelector('#lname').value == ''){
        UI.showNotification('All fields are required!', 'danger');
    }else{
        //const username = document.querySelector('#username').value;
        //const password = document.querySelector('#password').value;
        const fname = document.querySelector('#fname').value;
        const lname = document.querySelector('#lname').value;
        const access = document.querySelector('#access').value;

        if(access == 'some-access') {
            const location = document.querySelector('#location').checked;
            const role = document.querySelector('#role').checked;
            const heartrate = document.querySelector('#heartrate').checked;
            const stress = document.querySelector('#stress').checked;
            const dehydration = document.querySelector('#dehydration').checked;
            const healthYes = document.querySelector('#healthYes').checked;
            const midrisk = document.querySelector('#medrisk').checked;
            const highrisk = document.querySelector('#highrisk').checked;
            const extremerisk = document.querySelector('#extremerisk').checked;
            const riskYes = document.querySelector('#riskYes').checked;
            const grouping = document.querySelector('#grouping').value;
            const hourly = document.querySelector('#hourly').checked;
            const daily = document.querySelector('#daily').checked;
            const weekly = document.querySelector('#weekly').checked;
            const monthly = document.querySelector('#monthly').checked;

            // instantiate user
            user = new Users(fname, lname, access, location, role, heartrate, stress, dehydration, healthYes, midrisk, highrisk, extremerisk, riskYes, grouping, hourly, daily, weekly, monthly);
        }
        else {
            // instantiate user
            user = new Users(fname, lname, access, false, false, false, false, false, false, false, false, false, false, "small-group", false, false, false, false);
        }

        // preview
        var span = document.querySelector('.close');
        var popup = document.querySelector('#popup');
        popup.style.display = 'block';

        // if close button is clicked
        span.addEventListener('click', (e) => {
            popup.style.display = 'none';
        });

        window.onclick = function(e) {
            if(e.target == popup) {
                popup.style.display = 'none';
            }
        }

        if(access == 'full-access') {
            document.querySelector('#preview').src = "img/full-access.png";
        }
        else if(access == 'some-access') {
            console.log(user);

            if(user.location === false && user.heartrate === false && user.dehydration === false && user.stress === false && user.hourly === false && user.healthYes === false && user.riskYes === false && user.grouping === 'large-group') {
                document.querySelector('#preview').src = "img/some-access1.png";
            }
            else if(user.stress === false && user.grouping === 'small-group' && user.extremeRisk === false) {
                document.querySelector('#preview').src = "img/some-access2.png";
            }
        }
        else {
            document.querySelector('#preview').src = "img/private.png";
        }
    }

    document.querySelector('#confirm').addEventListener('click', (e) => {
        popup.style.display = 'none';

        // add user icon
        UI.addUserToList(user);

        // Store in browser storage
        Store.addUser(user);

        // clear fields
        UI.clear();
    });
});

