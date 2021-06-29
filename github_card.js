function makeCard(element) {
    var elem = document.querySelector(element);
    var username = null;
    try { username = elem.getAttribute("data-user"); }
    catch (e) { return; }
    const data_role_action = {
        "avatar": function (element, data) {
            element.src = data["avatar_url"];
        },
        "login": function (element, data) {
            element.innerHTML += data["login"];
        },
        "followers": function (element, data) {
            element.innerHTML += data["followers"];
            element.onclick = () => { window.open(data["html_url"]); };
        },
        "following": function (element, data) {
            element.innerHTML += data["following"];
            element.onclick = () => { window.open(data["html_url"]); };
        },
        "repos": function (element, data) {
            element.innerHTML += data["public_repos"];
            element.onclick = () => { window.open(data["html_url"] + "?tab=repositories"); };
        },
        "link": function (element, data) {
            element.onclick = () => { window.open(data["html_url"]); };
        }
    };
    var url = "https://api.github.com/users/" + username;
    const req = new Request(url, { method: 'GET' });
    function processNodes(childNodes, data) {
        childNodes.forEach(element => {
            try { if (element.childNodes.length) processNodes(element.childNodes, data); }
            catch (e) { }
            var role = null;
            try {
                role = element.getAttribute("data-role");
                data_role_action[role](element, data);
            }
            catch (e) { }
        });
    }
    fetch(req).then(response => {
        return response.json();
    }).then(data => {
        processNodes(elem.childNodes, data);
    }).catch(e => { });
}