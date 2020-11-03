

let isMouseDown = false;
let over = false;
let selectfirst_index;
let selectend_index;
let last_num;
let last_index;
const today = new Date();

today_year = today.getFullYear(); //년도 구하기
today_month = today.getMonth() + 1; //월 구하기
today_day = today.getDate();
today_yearMonth = today_year + "년" + today_month + "월";

let side_firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
let side_lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);// 이번달 마지막 날 구하기
let side_pre_month_date = new Date(today.getFullYear(), today.getMonth(), 0);  // 지난달 달 구하기
document.getElementById("pre_side_select_day").innerHTML = today_yearMonth;//년월 넣기
document.getElementById("side_select_day").innerHTML = today_yearMonth;//년월 넣기
document.getElementById("next_side_select_day").innerHTML = today_yearMonth;//년월 넣기

side_calenders(side_firstDate, side_lastDate, side_pre_month_date)
// --------------------      사이드 캘린더 작동   --------------------------------------------- 

document.getElementById("select_day").innerHTML = today_yearMonth;//년월 넣기
let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);//이번달 첫번재 날 구하기
let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);// 이번달 마지막 날 구하기
let pre_month_date = new Date(today.getFullYear(), today.getMonth(), 0);  // 지난달 달 구하기
const calendar = document.getElementById('main_calendar').lastElementChild;// 달력 테이블

buildCalender(lastDate, pre_month_date, firstDate);
// --------------------    메인 캘린더 작동 -------------------------------------




$(document).ready(function () {

    //스케줄 생성할때 실행됨 (클릭했을때 드레그 ㄴㄴ)
    $(document).on('click', '#main_calendar table', function (e) {
        let month = $(this).find('.month').text();
        let day = $(this).find('.day').text();
        document.getElementById("start_date").innerText = today_year + "년" + month + "월" + day + "일";
        document.getElementById("start").value = today_year + "-" + month + "-" + day;
        document.getElementById("end_date").innerText = today_year + "년" + month + "월" + day + "일";
        document.getElementById("end").value = today_year + "-" + month + "-" + day;
        document.getElementById('modal_title').innerText = "스케줄 추가";
        document.querySelector(".modal_grid").style.display = '';
        document.querySelector(".detail_schedule").style.display = 'none';
        document.querySelector('#modal_pic').style.display = '';
        document.querySelector('#modify_time').style.display = 'none';
        document.querySelector('#remove_btn').style.display = 'none';
        $("#myModal").show();

        //버블링 막아줌
        over = false;
        isMouseDown = false;

        return false;
    });


    // 스케줄 생성할때 실행됨(드레그 할때 클릭 ㄴㄴ)
    $(document)
        .on("mousedown", '#main_calendar table', function (event) {
            if (isMouseDown === false) {

                selectfirst_index = $(this).parent().attr('id');
                $('#' + selectfirst_index).css('background', '#999');
                isMouseDown = true;

                consolelog(selectfirst_index);
                mouse(this, "down");
            }
            $('#main_calendar td').css('background', '#fff');


            return false; // prevent text selection
        })
        //마우스오버문제
        .on('mouseover', '#main_calendar table', function (event) {
            // if (event.stopPropagation) {
            //     event.stopPropagation();
            // } else {
            //     event.cancelBubble = true;
            // }
            if (isMouseDown) {
                // event.preventDefault();
                // if (event.stopPropagation) {
                //     event.stopPropagation();
                // } else {
                //     event.cancelBubble = true;
                // }
                mouse(this, "over");


            }
        })
        .bind("selectstart", function () {
            return false; // prevent text selection in IE
        });

    $(document)
        .mouseup(function (event) {
            event.preventDefault();
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
            if (over) {
                mouse(this, "up");
                isMouseDown = false;
            }


        });

});


//스케줄 생성 함수
document.getElementById("modal_pic").addEventListener("click", function () {
    let start_date = document.getElementById('start').value;
    let end_date = document.getElementById('end').value;
    let start_time = document.getElementById('start_time').value + ":00";
    let end_time = document.getElementById('end_time').value + ":00";
    consolelog(start_date)
    consolelog(end_date)
    let list_date = [];
    let start = string_to_date(start_date), end = string_to_date(end_date);
    consolelog(start)
    consolelog(end)

    var getDaysArray = function (start, end) {
        for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(getTimeStamp(new Date(dt)));
        }
        return arr;
    };
    consolelog(user_id);
    let select_days = getDaysArray(start, end).join('/');
    add_PT_class(select_days, start_time, end_time);

});

$("#modal-close").click(function (e) {
    $('#myModal').hide();
    $('#main_calendar td').css("background-color", '#fff');
    document.getElementById('schedule_start_time').style.display = "";
    document.getElementById('schedule_end_time').style.display = "";
    document.getElementById('modify_start_time').setAttribute('class', 'hidden');
    document.getElementById('modify_end_time').setAttribute('class', 'hidden');


});



function consolelog(log) {
    console.log(log);
}

//지난달 버튼
function prev_month() {
    // 달력 숨기고 로딩창 띄우기
    document.getElementById("top_panel").className = "hidden";
    document.getElementById("main-roading").className = "hidden";
    document.getElementById("roader-container").className = "";

    lastDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), 0); // 현재 달 구하는 변수
    pre_month_date = new Date(pre_month_date.getFullYear(), pre_month_date.getMonth(), 0); //지난달 구하는 변수
    firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth() - 1, 1); // 첫쨋날 구하는 변수
    document.getElementById("select_day").innerHTML = lastDate.getFullYear() + "년" + (lastDate.getMonth() + 1) + "월"; //날짜 바꿔주기
    buildCalender(lastDate, pre_month_date, firstDate);// 달력 바꿔주기

    let mon = lastDate.getFullYear() + "-" + leadingZeros(lastDate.getMonth() + 1, 2) + "-%";
    get_PT_class(mon);
}

//다음달 버튼
function next_month() {
    // 달력 숨기고 로딩창 띄우기
    document.getElementById("top_panel").className = "hidden";
    document.getElementById("main-roading").className = "hidden";
    document.getElementById("roader-container").className = "";
    consolelog("다음달 버튼");
    lastDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + 2, 0); // 현재 달 구하는 변수
    pre_month_date = new Date(pre_month_date.getFullYear(), pre_month_date.getMonth() + 2, 0); //지난달 구하는 변수
    firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 1); // 첫쨋날 구하는 변수
    document.getElementById("select_day").innerHTML = lastDate.getFullYear() + "년" + (lastDate.getMonth() + 1) + "월"; //날짜 바꿔주기
    buildCalender(lastDate, pre_month_date, firstDate);// 달력 바꿔주기
    let mon = lastDate.getFullYear() + "-" + leadingZeros(lastDate.getMonth() + 1, 2) + "-%";
    get_PT_class(mon);
}


function buildCalender(lastDate, pre_month_date, firstDate) {
    consolelog("buildCalender")
    let leftDays = 7; // 일주일이 7일이기 때문에 7 setDays 와 반비례
    let setDays = 1;// leftDays 와 반비례
    //이번달 첫째날, 지난달 마지막날 구하기
    let day = firstDate.getDay();
    let pre_month_day = pre_month_date.getDate();
    let blank_num = pre_month_day - day; //지날달 마지막일
    let index = 1; // 칸 순서
    while (calendar.hasChildNodes()) {
        calendar.removeChild(calendar.lastChild);
    }
    while (setDays < lastDate.getDate()) {
        let row = calendar.insertRow();

        // 지난달 마지막일 채우기
        while (pre_month_day > blank_num) {
            let cell = row.insertCell();
            cell.innerHTML = this_month(blank_num + 1, "other", index, pre_month_date.getMonth() + 1);
            cell.id = "" + index;
            cell.className = "index";
            blank_num += 1;
            leftDays -= 1;
            index += 1;
        } // 1주
        let nextMonthDate = 1;
        while (leftDays != 0) {
            //다음달 1일부터 만들기
            if (setDays > lastDate.getDate()) {
                let cell = row.insertCell();
                cell.innerHTML = this_month(nextMonthDate, "other", index, pre_month_date.getMonth() + 3);
                cell.className = "index";
                cell.id = "" + index;

                nextMonthDate += 1;
                leftDays -= 1;

                //이번달 만들기
            } else {
                let cell = row.insertCell();
                cell.innerHTML = this_month(setDays, "this_month", index, pre_month_date.getMonth() + 2);
                cell.id = "" + index;
                cell.className = "index";

                setDays += 1;
                leftDays -= 1;
            }
            last_index = index;// 스케줄 생성할때 드레그시 백그라운드 컬러 변경시 사용
            index += 1;

        }
        leftDays = 7;
    }


}

///달력 날짜 생성
function this_month(day, type, index, month) {

    //달력안 요일에 맞는 날짜들을 넣어주고 해당 달과 달력의 인덱스값 , 날짜값들을 넣어준다
    let item = ' <td id="' + index + '"  ><table id="table' + day + '" class="date ' + type + ' ' + index + '"><thead>' +
        '                <tr>' +
        '<th class="index" style="display:none;">' + index + '</th>' +
        '                    <th class="month" style="display:none;">' + month + '</th>';
    if (month === today_month && day === today_day) {
        item += '                    <th ><div class="onDay day">' + day + '</div></th>';
    } else {
        item += '                    <th class="day ">' + day + '</th>';
    }
    item += '                </tr>' +
        '                </thead>' +
        '<tbody><tr></tr></tbody></table></td>';

    return item;
}

//현재 달(month)로 이동
function on_toady() {
    firstDate = new Date(today.getFullYear(), today.getMonth(), 1);//이번달 첫번재 날 구하기
    lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);// 이번달 마지막 날 구하기
    pre_month_date = new Date(today.getFullYear(), today.getMonth(), 0);  // 지난달 달 구하기
    document.getElementById("select_day").innerHTML = lastDate.getFullYear() + "년" + (lastDate.getMonth() + 1) + "월"; //날짜 바꿔주기
    buildCalender(lastDate, pre_month_date, firstDate)
    let mon = lastDate.getFullYear() + "-" + leadingZeros(lastDate.getMonth() + 1, 2) + "-%";
    get_PT_class(mon);
}



function mouse(cell, type) {
    //달력 드래그시 드래그한만큼 인덱스 가져오는 기능
    //마우스 다운한 상태에서 오버하면 오버하고 있는 셀 인덱스 번호를 변수에 할당
    //마우스 다운했을때 할당한 인덱스 값과 마지막 오버한 인덱스 번호 사이의 수 만큼  색변환
    //마우스 업 하면 시작 날짜와 끝날짜를 스케줄모달에 입력후 모달창 띄우익
    if (type === "down") {

    } else if (type === "over") {
        over = true;
        selectend_index = $(cell).parent().attr('id');
        consolelog("start   " + selectfirst_index);
        consolelog("end     " + selectend_index);
        let test1 = $("#" + String(selectfirst_index));
        consolelog($("#" + String(selectend_index)))

        let index = Number(selectfirst_index);
        while (index < Number(selectend_index) + 1) {
            document.getElementById(String(index)).style.backgroundColor = '#999';
            consolelog("while start " + selectfirst_index);
            consolelog("while end   " + selectend_index);
            consolelog("while index " + index);


            index++;
            last_num = index;
        }
        index = Number(selectend_index) + 1
        while (index < last_index) {
            document.getElementById(String(index)).style.backgroundColor = '#fff';
            index++;
        }


    } else {
        //선택된 날짜들의 시작날과 끝날을 가져와 모달창에 보여준다
        //over가 true 일 경우에만 실행된다
        //bubbling 막는 메소드가 작동하지 않아 boolean으로 막아줌
        let index = Number(selectfirst_index);
        let month = $("#" + String(index)).find('.month').text();
        let day = $("#" + String(index)).find('.day').text();
        over = false;
        document.getElementById("start_date").innerText = today_year + "년" + month + "월" + day + "일";
        document.getElementById("start").value = today_year + "-" + month + "-" + day;
        month = $("#" + String(last_num - 1)).find('.month').text();
        day = $("#" + String(last_num - 1)).find('.day').text();
        document.getElementById("end_date").innerText = today_year + "년" + month + "월" + day + "일";
        document.getElementById("end").value = today_year + "-" + month + "-" + day;
        document.getElementById('modal_title').innerText = "스케줄 추가";
        document.querySelector(".modal_grid").style.display = '';
        document.querySelector(".detail_schedule").style.display = 'none';
        document.querySelector('#modal_pic').style.display = '';
        document.querySelector('#modify_time').style.display = 'none';
        document.querySelector('#remove_btn').style.display = 'none';
        $("#myModal").show();


    }
}



function add_PT_class(select_days, start_time, end_time) {
    let data = new FormData();
    let obj = { "select_days": select_days, "start_time": start_time, "end_time": end_time };
    let json = JSON.stringify(obj);
    data.append("data", json);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://ec2-18-224-107-194.us-east-2.compute.amazonaws.com/Add_schedule.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            let text = e.currentTarget.responseText
            let obj = JSON.parse(text);
            if (obj.result === "fail") {
                console.log(obj.message);
                alert(obj.message);
                console.log(obj.error);
            } else if (obj.result === "ok") {
                console.log(obj.message);
                alert("추가 되었습니다");
                $("#myModal").hide();
                $("#main_calendar td").css("background", '#fff');
                location.reload();
            }
        }
    }

    xhr.send(data);

}

//날짜 포멧 바꿔줌 0000-00-00 이런식으로
function getTimeStamp(d) {


    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    return s;
}
//날짜 포멧 변경시 7이면 07 로 바꿔줌
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }

    return zero + n;
}

//로그인 시 데이터 가져와 날짜에 맞는 데이터를 넣어줌
function get_PT_class(today) {
    let data = new FormData();
    let obj = { "today": today, "request_key": 'schedule' };
    let json = JSON.stringify(obj);
    data.append("data", json);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.brownpack.ga/Main_activity.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            let text = e.currentTarget.responseText
            let obj = JSON.parse(text);
            if (obj.result === "schedule_empty") {
                console.log(obj.data);
                // alert(obj.message)
                console.log(obj.error);
            } else if (obj.result === "schedule_ok") {
                consolelog(obj.data)
                //결과값 파싱
                let json = JSON.parse(obj.data);
                for (let i in json.data) {
                    let day = Number(json.data[i].day.substring(8, 10));
                    let calendar_table = document.querySelector("#table" + String(day) + ":not(.other)").lastElementChild;
                    while (calendar_table.hasChildNodes()) {
                        calendar_table.removeChild(calendar_table.lastElementChild);
                    }
                    let row = calendar_table.insertRow();
                    let booker;
                    if (json.data[i].customer_id === null) {
                        booker = " 예약자 없음"

                    } else {
                        booker = json.data[i].customer_name;
                    }

                    row.innerHTML = schedule_div(json.data[i], booker);


                }

            }

        }
        //여기에서 로딩 표시 숨기기
        document.getElementById("roader-container").className = "hidden";
        setTimeout(function () {
            document.getElementById("main-roading").className = "";
            document.getElementById("top_panel").className = "top_panel";

        }, 100);

    }
    xhr.send(data);

}

//날짜 안에 들어가는 스케줄(div)생성
function schedule_div(data, booker) {
    let schedule_box;
    if (booker === " 예약자 없음") {
        schedule_box = '<div class="schedule_box unscheduled" id="unscheduled" onclick="schedule_detail(event,this)">' +
            '<span id="start_time">' + data.start_time.substring(0, 5) + ' </span>' +
            '<span id="end_time" class="hidden">' + data.end_time.substring(0, 5) + ' </span>' +
            '<span id="booker"> ' + booker + '</span>' +
            '<p class="hidden" id="day">' + data.day.substring(8, 10) + '</p>' +
            '<p class="hidden" id="index">' + data.num + '</p>' +
            '<p class="hidden" id="schedule_user_id">' + data.customer_id + '</p>' +
            '</div>';
    } else {
        schedule_box = '<div class="schedule_box scheduled" id="schedule" onclick="schedule_detail(event,this)">' +
            '<span id="start_time">' + data.start_time.substring(0, 5) + ' </span>' +
            '<span id="end_time" class="hidden">' + data.end_time.substring(0, 5) + ' </span>' +
            '<span id="booker"> ' + booker + '</span>' +
            '<p class="hidden" id="day">' + data.day.substring(8, 10) + '</p>' +
            '<p class="hidden" id="index">' + data.num + '</p>' +
            '<p class="hidden" id="schedule_user_id">' + data.customer_id + '</p>' +
            '</div>';
    }
    return schedule_box;
}

//스케줄 눌렀을때 상세 모달 띄우기
function schedule_detail(event, obj) {
    event.preventDefault();
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
    document.getElementById('modal_title').innerText = "예약 현황";
    document.querySelector(".modal_grid").style.display = 'none';
    document.querySelector(".detail_schedule").style.display = '';
    const start_time = document.getElementById('schedule_start_time');
    const end_time = document.getElementById('schedule_end_time');
    start_time.innerText = $(obj).find("#start_time").text();
    end_time.innerText = $(obj).find("#end_time").text();
    consolelog($(obj).find("#start_time").text())
    consolelog($(obj).find("#end_time").text())
    const start_day = document.getElementById('start_day');
    const end_day = document.getElementById('end_day');
    start_day.innerText = $(obj).find('#day').text() + "일";
    end_day.innerText = $(obj).find('#day').text() + "일";
    const start_month = document.getElementById('start_month');
    const end_month = document.getElementById('end_month');
    start_month.innerText = String(pre_month_date.getMonth() + 3) + "월";
    end_month.innerText = String(pre_month_date.getMonth() + 3) + "월";
    let booker = $(obj).find("#booker").text();
    consolelog("booker : " + booker);
    document.querySelector('#modal_pic').style.display = 'none';
    if (booker === '  예약자 없음') {
        document.querySelector('#schedule_index').innerText = $(obj).find("#index").text();
        document.querySelector('.user_item').style.display = 'none';
        document.querySelector('.none_user').style.display = '';
        document.querySelector('.none_user_btn').style.display = '';
        document.querySelector('#modify_time').style.display = '';
    } else {
        const customer_id = $(obj).find("#schedule_user_id").text();
        get_user(customer_id);
        document.querySelector('#modify_time').style.display = 'none';
        document.querySelector('#user_id').innerText = "(" + customer_id + ")";
        document.querySelector('#user_name').innerText = booker;
        document.querySelector('#schedule_index').innerText = $(obj).find("#index").text();
        document.querySelector('.user_item').style.display = '';
        document.querySelector('.none_user').style.display = 'none';
        document.querySelector('.none_user_btn').style.display = 'none';
    }
    $("#myModal").show();
    //버블링 방지
    over = false;
    isMouseDown = false;
    return false;
}

function get_user(user_id) {
    consolelog("dosomting");
    let data = new FormData();
    let obj = { "customer_id": user_id, "request_key": "user_detail" };
    let json = JSON.stringify(obj);
    data.append("data", json);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.brownpack.ga/Find_user.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            const text = e.currentTarget.responseText;
            const obj = JSON.parse(text);
            if (obj.result === "fail") {
                consolelog("fail");
            } else if (obj.result === "user_detail_ok") {
                document.querySelector('#user_age').innerText = obj.age;
                document.querySelector('#user_weight').innerText = obj.weight;
                document.querySelector('#user_tall').innerText = obj.stature;
                document.querySelector('#modal_image').src = obj.user_image;

            }

        }
    }
    xhr.send(data);
}

function modify_time() {

    const type = document.getElementById('modify_time').innerText;
    const modify_start_time = document.getElementById('modify_start_time');
    const modify_end_time = document.getElementById('modify_end_time');
    if (type === '수정') {
        const index = document.getElementById("schedule_index").innerText;
        modify_schedule(modify_start_time.value, modify_end_time.value, index);
    } else {
        document.getElementById('modify_time').innerText = "수정";
        const start_time = document.getElementById('schedule_start_time');
        const end_time = document.getElementById('schedule_end_time');

        start_time.style.display = "none";
        end_time.style.display = "none";
        modify_start_time.setAttribute('class', '');
        modify_start_time.value = start_time.innerText.trim();
        modify_end_time.setAttribute('class', '');
        modify_end_time.value = end_time.innerText.trim();

    }



}

function string_to_date(date) {

    // let sYear = date.substring(0,4);
    // let sMonth = date.substring(4,6);
    // let sDate = date.substring(7,9);

    return new Date(date);
    // return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
}

function remove_schedule() {
    const index = document.getElementById("schedule_index").innerText;
    consolelog("index :  " + index)
    const data = new FormData();
    const obj = { "index": index, "request_key": "schedule_delete" };
    let json = JSON.stringify(obj);
    data.append("data", json);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://ec2-18-224-107-194.us-east-2.compute.amazonaws.com/Main_activity.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            const text = e.currentTarget.responseText;
            const obj = JSON.parse(text);
            if (obj.result === "schedule_delete_fail") {
                console.log(obj.data);
                alert(obj.message);
            } else if (obj.result === "schedule_delete_ok") {
                console.log(obj.data);
                alert(obj.data);
                $("#myModal").hide();
                location.reload();
            }

        }
    }
    xhr.send(data);
}

function modify_schedule(start_time, end_time, index) {
    consolelog("index :  " + index)
    const data = new FormData();
    const obj = { "start_time": start_time, "end_time": end_time, "index": index, "request_key": "modify_time" };
    let json = JSON.stringify(obj);
    data.append("data", json);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://ec2-18-224-107-194.us-east-2.compute.amazonaws.com/Main_activity.php");
    xhr.onload = function (e) {
        if (this.status === 200) {
            const text = e.currentTarget.responseText;
            const obj = JSON.parse(text);
            if (obj.result === "modify_time_fail") {
                console.log(obj.data);
                console.log(obj.log);
                alert(obj.message);
            } else if (obj.result === "modify_time_ok") {
                console.log(obj.data);
                alert(obj.data);
                $("#myModal").hide();
                location.reload();
            }

        }
    }
    xhr.send(data);

}

function side_calenders(first_day, last_day, pre_month_date) {
    //지난달, 현재달 , 다음달 만들기
    //달력 아이디 값 ,해당달 시작일, 해당달 마지막일, 지난달 마지막일 넣기
    let side_lastDate = new Date(last_day.getFullYear(), last_day.getMonth(), 0); // 해당 달 구하는 변수
    let side_pre_month_date = new Date(pre_month_date.getFullYear(), pre_month_date.getMonth(), 0); //해당달 전달 구하는 변수
    let side_firstDate = new Date(first_day.getFullYear(), first_day.getMonth() - 1, 1); // 해당달 첫째날 구하는 변수
    document.getElementById("pre_side_select_day").innerHTML = side_lastDate.getFullYear() + "년 " + (side_lastDate.getMonth() + 1) + "월";;//년월 넣기
    side_calender_D_day("pre_side_select_day", side_lastDate)
    side_build_calender("pre_side_calender", side_firstDate, side_lastDate, side_pre_month_date);

    side_build_calender("side_calender", first_day, last_day, pre_month_date);
    document.getElementById("side_select_day").innerHTML = last_day.getFullYear() + "년 " + (last_day.getMonth() + 1) + "월";;//년월 넣기
    side_calender_D_day("side_select_day", last_day);

    side_lastDate = new Date(side_lastDate.getFullYear(), side_lastDate.getMonth() + 3, 0); // 해당달 다음달 구하는 변수
    side_pre_month_date = new Date(side_pre_month_date.getFullYear(), side_pre_month_date.getMonth() + 3, 0); //해당달 지난달 구하는 변수
    side_firstDate = new Date(side_firstDate.getFullYear(), side_firstDate.getMonth() + 2, 1); // 해당달 첫쨋날 구하는 변수
    side_build_calender("next_side_calender", side_firstDate, side_lastDate, side_pre_month_date);
    side_calender_D_day("next_side_select_day", side_lastDate)
    document.getElementById("next_side_select_day").innerHTML = side_lastDate.getFullYear() + "년 " + (side_lastDate.getMonth() + 1) + "월";;//년월 넣기
}

function side_calender_D_day(element_id, date) {
    consolelog("year : " + date.getFullYear() + " , month : " + Number(date.getMonth()));
    if (date.getFullYear() === today_year && (date.getMonth() + 1) === today_month) {
        document.getElementById(element_id).className = 'side_select_day d-day';
    } else { document.getElementById(element_id).className = 'side_select_day'; }
}

//사이드 캘린더
// 현재 달 마지막날
// 현재 달 첫번째날
// 지난달 마지막일
function side_build_calender(calender_id, first_day, last_day, pre_month_date) {
    let leftDays = 7; // 일주일이 7일이기 때문에 7 setDays 와 반비례
    let setDays = 1;// leftDays 와 반비례
    //이번달 첫째날, 지난달 마지막날 구하기
    let day = first_day.getDay();
    let pre_month_day = pre_month_date.getDate();
    let blank_num = pre_month_day - day; //지날달 마지막일
    let index = 1; // 칸 순서
    const side_calendar = document.getElementById(calender_id).lastElementChild;// 달력 테이블

    //달력 초기화
    while (side_calendar.hasChildNodes()) {
        side_calendar.removeChild(side_calendar.lastChild);
    }
    // 달력 만들기
    while (setDays < last_day.getDate()) {
        let row = side_calendar.insertRow();

        // 지난달 마지막일 채우기 / 첫째주
        while (pre_month_day > blank_num) {
            let cell = row.insertCell();
            cell.innerHTML = side_month(0);
            cell.id = "side_" + index;
            cell.className = "side_index";
            blank_num += 1;
            leftDays -= 1;
            index += 1;
        }
        let nextMonthDate = 1;
        while (leftDays != 0) {

            if (setDays > last_day.getDate()) {//다음달 1일 만들기
                let cell = row.insertCell();
                cell.innerHTML = side_month(0);
                cell.className = "side_index";
                cell.id = "side_" + index;

                nextMonthDate += 1;
                leftDays -= 1;

                //이번달 만들기
            } else {
                let cell = row.insertCell();
                cell.innerHTML = side_month(setDays, pre_month_date.getMonth() + 2);

                cell.id = "side_" + index;
                cell.className = "side_index";

                setDays += 1;
                leftDays -= 1;
            }
            index += 1;

        }
        leftDays = 7;
    }


}

function side_month(day, this_month) {
    //달력안 요일에 맞는 날짜들을 넣어주고 해당 달과 달력의 인덱스값 , 날짜값들을 넣어준다
    let item;
    if (day === 0) {
        day = "";
    }
    if (this_month === today_month && day === today_day) {
        item = '<td id="' + day + '"><div class="day_radius onDay" >' + day + '</div></td>';
    } else {
        item = '<td id="' + day + '"><div class="day_radius" >' + day + '</div></td>';
    }


    return item;
}

//사이드 지난달 버튼
document.getElementById("side_prev_month").addEventListener("click", function () {
    side_lastDate = new Date(side_lastDate.getFullYear(), side_lastDate.getMonth(), 0); // 현재 달 구하는 변수
    side_pre_month_date = new Date(side_pre_month_date.getFullYear(), side_pre_month_date.getMonth(), 0); //지난달 구하는 변수
    side_firstDate = new Date(side_firstDate.getFullYear(), side_firstDate.getMonth() - 1, 1); // 첫쨋날 구하는 변수
    side_calenders(side_firstDate, side_lastDate, side_pre_month_date);// 달력 바꿔주기


});

//사이드 다음달 버튼
document.getElementById("side_next_month").addEventListener("click", function () {
    side_lastDate = new Date(side_lastDate.getFullYear(), side_lastDate.getMonth() + 2, 0); // 현재 달 구하는 변수
    side_pre_month_date = new Date(side_pre_month_date.getFullYear(), side_pre_month_date.getMonth() + 2, 0); //지난달 구하는 변수
    side_firstDate = new Date(side_firstDate.getFullYear(), side_firstDate.getMonth() + 1, 1); // 첫쨋날 구하는 변수
    side_calenders(side_firstDate, side_lastDate, side_pre_month_date);// 달력 바꿔주기

});
