/**
 * Project: Employee Management
 * Features:
 * + Create employee
 * + Read employee(render)
 * + Validate form(dl đầu vào)
 * + Delete employee
 * + Update employee
 * + Search employee (id + name)
 */

var employeList = [];

function creatEmploye() {
  //1: lấy thông tin người dùng nhập từ input
  var employeTk = document.getElementById("tknv").value;
  var employeName = document.getElementById("name").value;
  var employeEmail = document.getElementById("email").value;
  var employePass = document.getElementById("password").value;
  var employeDatePicker = document.getElementById("datePicker").value;
  var employeSalary = document.getElementById("luongCB").value;
  var employeCourse = document.getElementById("chucvu").value;
  var employeTime = document.getElementById("gioLam").value;

  //1.2: kiểm tra xem employId có bị trùng ko
  for (var i = 0; i < employeList.length; i++) {
    if (employeList[i].employTk === employeTk) {
      //=> mảng chứa đối tượng nv của mk
      alert("Mã sinh viên trùng lặp !!");
      return;
    }
  }

  //2: tạo đối tượng nhân viên từ thông tin người dùng nhập=> khởi tạo ra 1 nv mới
  let employe = new Employ(
    employeTk,
    employeName,
    employeEmail,
    employePass,
    employeDatePicker,
    employeSalary,
    employeCourse,
    employeTime
  );

  // console.log(employe);

  //3: Thêm nhân viên mới vào ds
  employeList.push(employe);
  console.log(employeList);

  //In ra dsach NV mới ra bảng
  renderEmploye();

  // Lưu DL
  saveData();
}

// function Tong() {
//     var GĐ = "Giám Đốc";
//      var TP = "Trưởng phòng";
//      var NV = "Nhân viên";

//     if(course = GĐ) {
//         return(allSalar = Salary * 3);
//     } else if(course = TP) {
//         return(allSalar = Salary * 2);
//     } else {
//         return(allSalar = Salary * 1);
//     }

// }

//RENDEREMPLOY: in ra ds nhân viên
function renderEmploye() {
  let html = "";
  for (let i = 0; i < employeList.length; i++) {
    //=> data truyền vô mảng nào thì in mảng đó chứ ko phải lúc nào cx in theo ds nv, ta sẽ cho truyền vào 1 datta và truyền mảng nào thì in mảng đó
    html += `
    <tr>
    <td>${employeList[i].employTk}</td>
    <td>${employeList[i].fullName}</td>
    <td>${employeList[i].mail}</td>
    <td>${employeList[i].datePicker}</td>
    <td>${employeList[i].course}</td>
    <td>${employeList[i].allSalar()}</td>
    <td>${employeList[i].type()}</td>
    <td>
    <button onclick = "deleteEmploy( '${
      employeList[i].employTk
    }' )" class = "btn btn-danger">Xóa</button>
    </td> 
    </tr>`;
  }
  //   console.log(html);

  document.getElementById("tableDanhSach").innerHTML = html;
}

//LƯU DL
function saveData() {
  //b1: lưu dl
  // localStorage.setItem("EL", employeList)
  //b2: chuyển mảng (object) => JSON.stringfy thành chuỗi => ms lưu xuống local
  var employeListJson = JSON.stringify(employeList);
  localStorage.setItem("EL", employeListJson);
}

// Lấy Dl từ LOCAL lên
function getData() {
  //b1: lấy dl cũ từ LOCAL lên => hiện ra màn hình
  var employeListJson = localStorage.getItem("EL");

  //b2: ktra nếu lần đầu vô web(local chưa lưu sl nào hết)
  if (!employeListJson) return; //=> nếu employList là False(o có gì để lấy) thì sẽ thoát ra, ko lấy gì nữa

  //b3: đảo ngc chuỗi thành mảng để lụm lên là mảng
  // employeList = JSON.parse(employeListJson);

  //b2(mapData): chuyển chuỗi thành mảng rồi vắn vô biến(biến này chính là mảng employList)
  var employeListLocal = JSON.parse(employeListJson);
  //b3(mapData): Gọi hàm mapData chạy
  employeList = mapData(employeListLocal); //=> nhận dl từ local ròi map thành dl new

  //b4: in employ ra man hình
  renderEmploye();
}

// khi đổi chuỗi thành mảng thì sẽ mất hết phương thức, chỉ còn thuộc tính
//MAP DATA: input: mảng sv từ local => ouput: mảng sv mới
function mapData(dataFromLocal) {
  //b1: tạo mảng kqua new và dùng vòng lặp chay qua từng ptu cũ
  var result = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var oldEmploye = dataFromLocal[i];
    var newEmploye = new Employ(
      oldEmploye.employTk,
      oldEmploye.fullName,
      oldEmploye.mail,
      oldEmploye.password,
      oldEmploye.datePicker,
      oldEmploye.salary,
      oldEmploye.course,
      oldEmploye.time
    );
    result.push(newEmploye);
  }
  console.log(result);
  return result;
}
//employeList[i].allSalar()
//employeList[i].type()

//DELETEDEMPLOYE:
function deleteEmploy(employTk) {
  //gắn cho cái button xóa ở bên html

  let index = findByTk(employTk); //truyền vô cái TK mà mk đang muốn xóa, tìm xong sẽ return về index

  if (index === -1) {
    alert("Không tìm thấy TK phù hợp");
    return; //ko lm gì nữa hết vì ko tìm đc id hợp lệ
  }

  employeList.splice(index, 1); //xóa tại vị trí indexx và xóa mấy phần tử

  renderEmploye();
}

//tạo hàm con để tìm đc index. input: nhận vào ID; output: trả INdex(vị trí nằm chỗ nào trong ds)
function findByTk(tk) {
  for (let i = 0; i < employeList.length; i++) {
    if (employeList[i].employTk === tk) {
      //dò từ đầu đến cuối ds xem có ai có id giống vsid mk cần tìm
      return i; //giả về vị trí mmaf id đó nằm
    }
  }
  return -1; //ko tìm thấy id cần tìm
}

//b5(lấy dl từ Local): khi f5 lại thì những dl từ local sẽ hiện lên màn hình
window.onload = function () {
  //code ở đây khi user load lại trang
  console.log("window onload");
  getData();
};
