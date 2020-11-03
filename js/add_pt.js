function add_routine() {
    console.log("Dfs")
    const routine = document.getElementById('add_routine')
    if (routine.childElementCount >= 15) {
        alert('더이상 추가 할 수 없습니다.');
        return;
    }
    let div = document.createElement('div');
    let span =
        '            <span><input type="text" placeholder="싯업"></span>' +
        '            <span><input type="number" placeholder="15" max="999" step="1"></span>' +
        '            <span><input type="number" placeholder="5" max="999" step="1"></span>' +
        '            <span><button type="button" class="remove_btn icon_btn"><i class="fas fa-minus-circle fa-2x"></i></button></span>';
    div.innerHTML = span;
    routine.appendChild(div);

}




function complete() {
    let routine_count = document.querySelector('#add_routine').getElementsByTagName('div');
    let arry = new Array();
    console.log(routine_count)
    for (let i in routine_count) {
        console.log(routine_count[i]);
        if (i < 3) {
            let span = routine_count[i].getElementsByTagName('input');
            console.log(span[1])
            let repetition = String(span[1].value);
            let set_number = String(span[2].value);
            let name = String(span[0].value);
            console.log(repetition)
            console.log(set_number)

            let json = { "repetition": repetition, "set_number": set_number, "exercise_name": name }
            arry.push(json)
        }

    }
    let routine_arr = JSON.stringify(arry)
    console.log(routine_arr)
    let weight = document.getElementById('weight').value;
    let muscle = document.getElementById('muscle').value;
    let fat = document.getElementById('fat').value;
    let uniqueness = document.getElementById('text_uniqueness').value;
    let select_day = document.getElementById('select_day');
    console.log(select_day);
    let day = select_day.options[select_day.selectedIndex].text;
    let customer_id = sessionStorage.getItem('customer_id');
    console.log("day : " + day);
    console.log("weight : " + weight);
    console.log("muscle : " + muscle);
    console.log("fat : " + fat);
    console.log("uniqueness : " + uniqueness);
    console.log("customer_id : " + customer_id);

    let obj = { "request_key": "pt_log_insert", "weight": weight, "muscle": muscle, "fat": fat, "date": day, "uniqueness": uniqueness, "customer_id": customer_id };
    const json_data = JSON.stringify(obj);
    console.log(obj)

    const data = new FormData();
    //
    console.log(json_data)
    data.append("data", json_data);
    data.append("routine", routine_arr);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://ec2-18-224-107-194.us-east-2.compute.amazonaws.com/PT_log.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            const obj = JSON.parse(e.currentTarget.responseText);
            if (obj.result === "pt_log_fail") {
                console.log(obj.data);
                console.log(obj.log);
                alert(obj.message)
                console.log(obj.log);
            } else if (obj.result === "pt_log_ok") {
                console.log(obj.data);
                alert(obj.data)
                location.replace('./my_user_list.html');
            }
        }
        if (this.status === 404) {
            alert("연결에 실패했습니다 다시시도해주세요.");
        }
    }
    xhr.send(data);
}

function cancel() {
    history.back();
}

function insert_day() {
    const customer_id = sessionStorage.getItem("customer_id");
    console.log(customer_id);
    const json_data = JSON.stringify({ "request_key": "PT_log_none", "customer_id": customer_id });
    const data = new FormData();

    data.append("data", json_data);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://ec2-18-224-107-194.us-east-2.compute.amazonaws.com/PT_log.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            const obj = JSON.parse(e.currentTarget.responseText);
            if (obj.result === "PT_day_fail") {
                console.log(obj.log);
                alert(obj.data)
                console.log(obj.log);
            } else if (obj.result === "PT_day_ok") {
                let json = JSON.parse(obj.data)
                console.log(json.data)
                add_option(json.data)
            }



        }
        if (this.status === 404) {
            alert("연결에 실패했습니다 다시시도해주세요.");
        }
    }
    xhr.send(data);
}

function add_option(data) {

    const select = document.getElementById('select_day');
    console.log(select);
    while (select.hasChildNodes()) {
        select.removeChild(select.lastChild);
    }
    for (i in data) {
        let opt = document.createElement('option');
        console.log(data)
        opt.setAttribute('value', data[i].day);
        opt.innerText = data[i].day;
        select.appendChild(opt);

    }
    // select_day(data[0].index_value);
}