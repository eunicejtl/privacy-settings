// on load show this section
window.onload = function() {
    hideManageDiv();

    // listener - if account button is clicked
    document.querySelector('#account').addEventListener('click', (e) => {
        hideManageDiv();
        // show account div
        showAcctDiv();
    })

    // listener - if manage button is clicked
    document.querySelector('#manage').addEventListener('click', (e) => {
        hideAcctDiv();
        hideAddUser();
        showManageDiv();
        showInnerDiv();

        // go through local storage, pull out first account to display
        let users; 
        if(localStorage.length === 0) { users = []; }
        else {
            users = JSON.parse(localStorage.getItem('users'));
            if(users.length == 0) {
                hideInnerDiv();
                showAddUser();
    
                // if some access was chosen
                document.querySelector('#access').addEventListener('change', (e) => {
                    var select = document.querySelector('#access');
                    var showThis = new Controls();
                    if(select.options[select.selectedIndex].value == 'some-access') {
                        // show extended container
                        showThis.createUI();
                        document.querySelector('#main').style.height = "100vw";
                    }
                    else {
                        showThis.removeUI();
                        document.querySelector('#main').style.height = "100vh";
                    }
                })
            }
            else {
                if(users[0].access == 'some-access') {
                    showControls();
                    if(users[0].access === "some-access") {
                        document.querySelector('#main').style.height = "80vw";
                    }
                    else {
                        document.querySelector('#main').style.height = "100vh";
                    }
                    inputForm(users[0]);
                }
                else {
                    inputForm(users[0]);
                }
            }
        }

        // add user button
        document.querySelector('#addUserForm').addEventListener('click', (e) => {
            // display add user form
            hideInnerDiv();
            showAddUser();

            // if some access was chosen
            document.querySelector('#access').addEventListener('change', (e) => {
                var select = document.querySelector('#access');
                var showThis = new Controls();
                if(select.options[select.selectedIndex].value == 'some-access') {
                    // show extended container
                    showThis.createUI();
                    document.querySelector('#main').style.height = "80vw";
                }
                else {
                    showThis.removeUI();
                    document.querySelector('#main').style.height = "100vh";
                }
            })
        })

        // user is clicked
        document.querySelector('#user-list').addEventListener('click', (e) => {
            hideAddUser();
            showInnerDiv();

            // go through the list of users
            const users = Store.getUsers();

            // find the coressponding user
            users.forEach((user) => {
                if(user.fname === e.target.id) {   
                    if(user.access === "some-access") {
                        document.querySelector('#main').style.height = "100vw";
                    }
                    else {
                        document.querySelector('#main').style.height = "100vh";
                    }
                    inputForm(user);
                }
            })

            // delete user
            document.querySelector('#delete').addEventListener('click', (f) => {
                // go through the list of users
                const users = Store.getUsers();

                // find the coressponding user
                users.forEach((user, index) => {
                    if(document.querySelector('#fnameInfo').value == user.fname) {   
                        // splice
                        users.splice(index, 1);
                        localStorage.setItem('users', JSON.stringify(users));

                        UI.deleteUser(e);

                        // 
                        inputForm(JSON.parse(localStorage.getItem('users'))[0]);
                    }
                })
            })
        })
    })
};

// toggle account div
function showAcctDiv() { document.querySelector('#accountDiv').style.display = "block"; }

function hideAcctDiv() { document.querySelector('#accountDiv').style.display = "none"; }

// toggle manage div
function showManageDiv() { document.querySelector('#manageDiv').style.display = "block"; }

function hideManageDiv() { document.querySelector('#manageDiv').style.display = "none"; }

// toggle inner div
function showInnerDiv() { document.querySelector('#innerDiv').style.display = "block"; }

function hideInnerDiv() { document.querySelector('#innerDiv').style.display = "none"; }

// toggle add user div
function showAddUser() { document.querySelector('#addAccountContainer').style.display = "block"; }

function hideAddUser() { document.querySelector('#addAccountContainer').style.display = "none"; }

// toggle controls div
function showControls() { document.querySelector('#controlsDiv').style.display = "block"; }

function hideControls() { document.querySelector('#controlsDiv').style.display = "none"; }

function inputForm(user) {

    if(user == "") {
        document.querySelector('#usernameInfo').value = "";
        document.querySelector('#passwordInfo').value = "";
        document.querySelector('#fnameInfo').value = "";
        document.querySelector('#lnameInfo').value = "";
        document.querySelector('#accessInfo').value = "";
    }
    else {
        document.querySelector('#usernameInfo').value = "worker.user";
        document.querySelector('#passwordInfo').value = "12345678";
        document.querySelector('#fnameInfo').value = user.fname;
        document.querySelector('#lnameInfo').value = user.lname;
        document.querySelector('#accessInfo').value = user.access;
        document.querySelector('#locationInfo').checked = user.location;
        document.querySelector('#roleInfo').checked = user.role;
        document.querySelector('#heartrateInfo').checked = user.heartrate;
        document.querySelector('#stressInfo').checked = user.stress;
        document.querySelector('#dehydrationInfo').checked = user.dehydration;
        document.querySelector('#healthYesInfo').checked = user.healhYes;
        document.querySelector('#medRiskInfo').checked = user.midRisk;
        document.querySelector('#highRiskInfo').checked = user.highRisk;
        document.querySelector('#extremeRiskInfo').checked = user.extremeRisk;
        document.querySelector('#fatigueYesInfo').checked = user.riskYes;
        if(user.grouping == 'small-group') {
            document.querySelector('#groupingInfo').value = "only my information";
        }
        else  {
            document.querySelector('#groupingInfo').value = "with other workers' information";
        }
        document.querySelector('#hourlyInfo').checked = user.hourly;
        document.querySelector('#dailyInfo').checked = user.daily;
        document.querySelector('#weeklyInfo').checked = user.weekly;
        document.querySelector('#monthlyInfo').checked = user.monthly;
    }
    
}

function Controls(container) {
    // controls UI 
    var UI = {
        container: null,
        contextTitle: null,
        info1: null,
        location: null,
        locationLabel: null,
        role: null,
        roleLabel: null,
        healthTitle: null,
        label1: null,
        heartrateLabel: null,
        heartrate: null,
        stressLabel: null,
        stress: null,
        dehydration: null,
        dehydrationLabel: null,
        label2: null,
        warning:null,
        lowrisk: null,
        lowriskLabel: null,
        medrisk: null,
        medRiskLabel: null,
        highrisk: null,
        highriskLabel: null,
        extremerisk: null,
        extremeriskLabel: null,
        subtitle1: null,
        groupLabel: null,
        grouping: null,
        smallGroup: null,
        largeGroup: null,
        subtitle2: null,
        label3: null,
        label4: null,
        timeTitle: null,
        hourly: null,
        hourlyLabel: null,
        daily: null,
        dailyLabel: null,
        weekly:null, 
        weeklyLabel: null,
        monthly: null,
        monthlyLabel: null,
        br: null, 

        healthLabel: null,
        healthInput: null,
        riskLabel: null,
        riskInput: null
    }

    this.createUI = function() {
        UI.br = document.createElement('br');

        UI.container = document.createElement("div");
        UI.container.id = "partial";

        UI.contextTitle = document.createElement("h5");
        UI.contextTitle.innerHTML = "Context";

        UI.info1 = document.createElement("h6");
        UI.info1.innerHTML = "Work context such as weather and temperature will automatically be shown. Select which of the following information to display.";

        UI.location = document.createElement("input");
        UI.location.id = "location";
        UI.location.type = "checkbox";
        UI.location.value = "location";
        UI.location.className = "checkbox";

        UI.locationLabel = document.createElement("label");
        UI.locationLabel.htmlFor = "location";
        UI.locationLabel.innerHTML = "Site Location";
        
        UI.role = document.createElement("input");
        UI.role.id = "role";
        UI.role.type = "checkbox";
        UI.role.value = "role";
        UI.role.className = "checkbox";

        UI.roleLabel = document.createElement("label");
        UI.roleLabel.htmlFor = "role";
        UI.roleLabel.innerHTML = "Work Role";

        UI.healthTitle = document.createElement("h5");
        UI.healthTitle.innerHTML = "Health Data";
        
        UI.label1 = document.createElement("h6");
        UI.label1.innerHTML = "Please select which of the following health information to display."

        UI.heartrate = document.createElement("input");
        UI.heartrate.id = "heartrate";
        UI.heartrate.type = "checkbox";
        UI.heartrate.value = "heartrate";
        UI.heartrate.className = "checkbox";

        UI.heartrateLabel = document.createElement("label");
        UI.heartrateLabel.htmlFor = "heartrate";
        UI.heartrateLabel.innerHTML = "Heart Rate";

        UI.stress = document.createElement("input");
        UI.stress.id = "stress";
        UI.stress.type = "checkbox";
        UI.stress.value = "stress";
        UI.stress.className = "checkbox";

        UI.stressLabel = document.createElement("label");
        UI.stressLabel.htmlFor = "stress";
        UI.stressLabel.innerHTML = "Stress Levels";

        UI.dehydration = document.createElement("input");
        UI.dehydration.id = "dehydration";
        UI.dehydration.type = "checkbox";
        UI.dehydration.value = "dehydration";
        UI.dehydration.className = "checkbox";

        UI.dehydrationLabel = document.createElement("label");
        UI.dehydrationLabel.htmlFor = "dehydration";
        UI.dehydrationLabel.innerHTML = "Dehydration Levels";

        UI.healthLabel = document.createElement("label");
        UI.healthLabel.innerHTML = "Notify this user about my health status (this user will not be notified about unselected options.)";
        UI.healthLabel.htmlFor = "healthYes";

        UI.healthInput = document.createElement("input");
        UI.healthInput.id = "healthYes";
        UI.healthInput.type = "checkbox";
        UI.healthInput.value = "healthYes";
        UI.healthInput.className = "checkbox";
        UI.healthInput.checked = true;

        UI.label2 = document.createElement("h6");
        UI.label2.innerHTML = "Low risk levels will automatically be shown. Please select other fatigue risks to display.";
        
        UI.lowrisk = document.createElement("input");
        UI.lowrisk.id = "lowrisk";
        UI.lowrisk.type = "checkbox";
        UI.lowrisk.value = "low-risk";
        UI.lowrisk.className = "checkbox";
        UI.lowrisk.checked = true;
        UI.lowrisk.disabled = "disabled";

        UI.lowriskLabel = document.createElement("label");
        UI.lowriskLabel.htmlFor = "lowrisk";
        UI.lowriskLabel.innerHTML = "Low Risk";

        UI.medrisk = document.createElement("input");
        UI.medrisk.id = "medrisk";
        UI.medrisk.type = "checkbox";
        UI.medrisk.value = "med-risk";
        UI.medrisk.className = "checkbox";

        UI.medRiskLabel = document.createElement("label");
        UI.medRiskLabel.htmlFor = "medrisk";
        UI.medRiskLabel.innerHTML = "Medium Risk";

        UI.highrisk = document.createElement("input");
        UI.highrisk.id = "highrisk";
        UI.highrisk.type = "checkbox";
        UI.highrisk.value = "high-risk";
        UI.highrisk.className = "checkbox";

        UI.highriskLabel = document.createElement("label");
        UI.highriskLabel.htmlFor = "highrisk";
        UI.highriskLabel.innerHTML = "High Risk";

        UI.extremerisk = document.createElement("input");
        UI.extremerisk.id = "extremerisk";
        UI.extremerisk.type = "checkbox";
        UI.extremerisk.value = "extreme-risk";
        UI.extremerisk.className = "checkbox";

        UI.extremeriskLabel = document.createElement("label");
        UI.extremeriskLabel.htmlFor = "extremerisk";
        UI.extremeriskLabel.innerHTML = "Extreme Risk";

        UI.riskLabel = document.createElement("label");
        UI.riskLabel.innerHTML = "Notify this user about my fatigue risks (this user will not be notified about unselected options.)";
        UI.riskLabel.htmlFor = "riskYes";

        UI.riskInput = document.createElement("input");
        UI.riskInput.id = "riskYes";
        UI.riskInput.type = "checkbox";
        UI.riskInput.value = "riskYes";
        UI.riskInput.className = "checkbox";
        UI.riskInput.checked = true;

        UI.label3 = document.createElement("h6");
        UI.label3.innerHTML = "If you do not wish to be identified, you can choose to group your information with other workers.";

        UI.groupLabel = document.createElement("label");
        UI.groupLabel.innerHTML = "Share ";

        UI.grouping = document.createElement("select");
        UI.grouping.name = "grouping";
        UI.grouping.id = "grouping";

        UI.smallGroup = document.createElement("option");
        UI.smallGroup.value = "small-group";
        UI.smallGroup.innerHTML = "only my information";

        UI.largeGroup = document.createElement("option");
        UI.largeGroup.value = "large-group";
        UI.largeGroup.innerHTML = "with other workers' information";

        UI.grouping.appendChild(UI.smallGroup);
        UI.grouping.appendChild(UI.largeGroup);   

        UI.timeTitle = document.createElement("h5");
        UI.timeTitle.innerHTML = "Choose time periods";

        UI.label4 = document.createElement("h6");
        UI.label4.innerHTML = "Monthly information will automatically be shown. Please select other time periods to show.";
        
        UI.hourly = document.createElement("input");
        UI.hourly.className = "checkbox";
        UI.hourly.type = "checkbox";
        UI.hourly.value = "hourly";
        UI.hourly.id = "hourly";
        
        UI.hourlyLabel = document.createElement("label");
        UI.hourlyLabel.htmlFor = "hourly";
        UI.hourlyLabel.innerHTML = "Hourly";

        UI.daily = document.createElement("input");
        UI.daily.className = "checkbox";
        UI.daily.type = "checkbox";
        UI.daily.value = "daily";
        UI.daily.id = "daily";
        
        UI.dailyLabel = document.createElement("label");
        UI.dailyLabel.htmlFor = "daily";
        UI.dailyLabel.innerHTML = "Daily";

        UI.weekly = document.createElement("input");
        UI.weekly.className = "checkbox";
        UI.weekly.type = "checkbox";
        UI.weekly.value = "weekly";
        UI.weekly.id = "weekly";
        
        UI.weeklyLabel = document.createElement("label");
        UI.weeklyLabel.htmlFor = "weekly";
        UI.weeklyLabel.innerHTML = "Weekly";

        UI.monthly = document.createElement("input");
        UI.monthly.className = "checkbox";
        UI.monthly.type = "checkbox";
        UI.monthly.value = "monthly";
        UI.monthly.id = "monthly";
        UI.monthly.checked = true;
        UI.monthly.disabled = "disabled";
        
        UI.monthlyLabel = document.createElement("label");
        UI.monthlyLabel.htmlFor = "monthly";
        UI.monthlyLabel.innerHTML = "Monthly";

        UI.container.appendChild(UI.contextTitle); // context
        UI.container.appendChild(UI.location);
        UI.container.appendChild(UI.locationLabel);
        UI.container.appendChild(UI.role);
        UI.container.appendChild(UI.roleLabel);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.healthTitle); // health data
        UI.container.appendChild(UI.label1);
        UI.container.appendChild(UI.heartrate);
        UI.container.appendChild(UI.heartrateLabel);
        UI.container.appendChild(UI.stress);
        UI.container.appendChild(UI.stressLabel);
        UI.container.appendChild(UI.dehydration);
        UI.container.appendChild(UI.dehydrationLabel);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.healthLabel);
        UI.container.appendChild(UI.healthInput);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.label2); // fatigue risk levels
        UI.container.appendChild(UI.lowrisk);
        UI.container.appendChild(UI.lowriskLabel);
        UI.container.appendChild(UI.medrisk);
        UI.container.appendChild(UI.medRiskLabel);
        UI.container.appendChild(UI.highrisk);
        UI.container.appendChild(UI.highriskLabel);
        UI.container.appendChild(UI.extremerisk);
        UI.container.appendChild(UI.extremeriskLabel);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.riskLabel);
        UI.container.appendChild(UI.riskInput);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.label3); // grouping
        UI.container.appendChild(UI.groupLabel);
        UI.container.appendChild(UI.grouping);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.br);
        UI.container.appendChild(UI.timeTitle); // time periods
        UI.container.appendChild(UI.label4);
        UI.container.appendChild(UI.hourly);
        UI.container.appendChild(UI.hourlyLabel);
        UI.container.appendChild(UI.daily);
        UI.container.appendChild(UI.dailyLabel);
        UI.container.appendChild(UI.weekly);
        UI.container.appendChild(UI.weeklyLabel);
        UI.container.appendChild(UI.monthly);
        UI.container.appendChild(UI.monthlyLabel);

        // append this container to #addAccountContainer
        document.querySelector('#extended').appendChild(UI.container);
    }

    this.removeUI = function() {
        // remove all nodes
        var container = document.querySelector('#extended');
        while(container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
    }

    this.display = function() {

    }
}