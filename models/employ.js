function Employ(tk, name, email, pass, datePicker, salary, course, time) {
  this.employTk = tk;
  this.fullName = name;
  this.mail = email;
  this.password = pass;
  this.datePicker = datePicker;
  this.salary = salary;
  this.course = course;
  this.time = time;
  // this.allSalar = allSalar;
  // this.type = type;
  
  

  this.allSalar = function() {
    var S = "Sếp";
    var TP = "Trưởng phòng";
    var NV = "Nhân viên";
    if(this.course === S){
      return(this.salary * 3);
    // }else if(this.course = TP) {
    //   return(this.salary * 2);
    // } else {
    //   return(this.salary * 1);
    };
    if(this.course === TP) {
      return(this.salary * 2);
    };
    if(this.course === NV) {
      return(this.salary * 1);
    }
  };

  this.type = function() {
   
    if( this.time >= 192 ) {
        return("Xuất sắc");
    }
     if( this.time >= 176 ) {
        return(" giỏi");
    }
     if( this.time >= 160 ) {
        return(" khá");
    } 
     if( this.time < 160 ) {
       return(" Trung Bình!!");
    };
  };
}
