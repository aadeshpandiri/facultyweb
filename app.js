const path = require('path');
const express = require('express');
const ejs = require('ejs');
//const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql');

const connection=mysql.createConnection({
    host: "localhost",
     user: "root",
    password: "",
    database: "FIS"
    
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//app.use(connect.bodyParser({strict: false}));

app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM Subjects";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            users : rows
        });
    });
});

app.get('/add',(req, res) => {
    res.render('user_create', {
        title : 'Subjects Form'
    });
});

app.get('/test',(req, res) => {
    res.render('qq', {
        
    });
});

app.post('/savesubjects',(req, res) => { 
    //var trr = JSON.parse(req.body);
    var reads =  req.body;
    console.log(reads);
    
    let data = {Subject_code: req.body.Subjectcode, Subject_Name:req.body.Subjectname };
    str = JSON.stringify(req.body);
    console.log('req body : '+str);
    console.log('values : '+req.body.Subjectcode +'&&&&'+ req.body.Subjectname);
    console.log('data is : '+data);
    let sql = "INSERT INTO Subjects SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.post('/savefacultycompetence',(req, res) => {   
    let data = {Faculty_ID: req.body.Facultyid, Subject_code:req.body.Subjectcode , Specilisation_category: req.body.Specilisationcategory };
    console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
    let sql = "INSERT INTO faculty_competence SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.post('/saveeducation',(req, res) => { 
    let data = {Faculty_ID: req.body.Facultyid_Education, 
         Degree_Diploma:req.body.Degreediploma_Education,
         Specialization: req.body.Specialisation_Education  ,
         Board_University: req.body.Boarduniversity_Education ,
         Percentage_CPI_GPA : req.body.Percentage_Education,
         year_of_pass:req.body.Year_Education ,
         Division :  req.body.Division_Education ,
         certificate_link:  req.body.Certificatelink_Education  };
         
    console.log(req.body);
    // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
    let sql = "INSERT INTO faculty_education  SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.post('/saveaddress', (req, res) => {
    let data = {Faculty_ID: req.body.Faculty_ID_address, 
        House_number:req.body.HouseNo_address,
        Street_name: req.body.StreetName_address  ,
        Area: req.body.AreaName_address ,
        Address_line1 : req.body.AddressLineone_address,
        Address_line2:req.body.AddressLinetwo_address ,
        District :  req.body.District_address ,
        State:  req.body.State_address,
        PinCode :req.body.PIN_address;
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_address  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
})

app.post('/savebook', (req, res) => {
    let data = {Faculty_ID: req.body.Faculty_ID_book, 
        Title:req.body.Title_book,
        ISBN_Number: req.body.ISBN_book  ,
        Volume: req.body.Volume_book ,
        publisher_name : req.body.Pusblisher_book,
        page_number:req.body.NoofPages_book ,
        year :  req.body.Year_book ,
        certificate_link :  req.body.Certificate_book
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_book  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
    
})

app.post('/saveconference', (req, res) => {
    let data = {Faculty_ID: req.body.Faculty_ID_Conference, 
        Conference_name:req.body.Name_Conference,
        year: req.body.Year_Conference  ,
        venue: req.body.Venue_Conference ,
        title : req.body.Title_Conference,
        ISBN_number:req.body.ISBN_Conference ,
        publisher_name :  req.body.Publisher_Conference ,
        link_first_page :  req.body.Linkfirstpage_Conference,
        from_date:req.body.fromdate_Conference,
        to_date: req.body.todate_Conference  ,
        page_numbers: req.body.PageNumbers_Conference ,
        category : req.body.Category_Conference,
        scopus:req.body.Scopus_Conference ,
        webofscience :  req.body.webofscience_Conference ,
        ugclisted :  req.body.ugclisted_Conference,
        others:  req.body.others_Conference ,
        certificate_link : req.body.certificate_Conference
        
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_conference  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
})

app.post('/saveexperience', (req, res) => {
    let data = {Faculty_ID: req.body.Faculty_ID_Experience, 
        Deisgnation:req.body.Designation_Experience,
        Experience: req.body.Experience_Experience  ,
        Organisation : req.body.Oraganisation_Experience ,
        work_nature : req.body.WorkNature_Experience,
        Joining_date:req.body.JoiningDate_Experience ,
        employment_type :  req.body.EmployementType_Experience ,
        ratified_service :  req.body.RatifiedService_Experience,
        certificate_link :req.body.CertificateLink_Experience
        
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_experience  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
})

app.post('/saveprofile', (req, res) => {
    let data = {Faculty_ID: req.body.Faculty_Id_Profile, 
        Faculty_Name:req.body.Name_Profile,
        Father_Name: req.body.FatherName_Profile  ,
        Mother_Name: req.body.MotherName_Profile ,
        Blood_group : req.body.Bloodgroup_Profile,
        Designation:req.body.designation_Profile ,
        Gender :  req.body.Gender_Profile ,
        DOB :  req.body.DOB_Profile,
        Religion:req.body.Religion_Profile,
        Nationality: req.body.Nationlaity_Profile  ,
        Handicapped: req.body.Handicapped_Profile ,
        Aadhar_no : req.body.Aadhar_Profile,
        PAN_no:req.body.PAN_Profile ,
        Mobile :  req.body.Mobile_Profile ,
        Alternate_mobile :  req.body.AlternateMobile_Profile,
        email:  req.body.Email_Profile ,
        alternate_email : req.body.AlternateEmail_Profile,
        joining_date : req.body.JoiningDate_Profile,
        relieving_date:req.body.RelievingDate_Profile ,
        status :  req.body.Status_Profile 
        
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_profile  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
})

app.post('/savevisiting', (req, res) => {
    let data = {Faculty_ID: req.body.Faculty_ID_visiting, 
        year:req.body.Year_visiting,
        from_date: req.body.fromdate_visiting  ,
        to_date: req.body.todate_visiting ,
        Subject : req.body.Subject_visiting,
        Activity:req.body.Activity_visiting ,
         qualification:  req.body.Qualification_visiting ,
        organisation :  req.body.Organisation_visiting,
        designation:req.body.Designation_visiting,
        proof: req.body.Proof_visiting  
        
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_visiting  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
})

app.post('/saveleaves', (req, res)=>{
    let data = {Faculty_ID: req.body.Faculty_ID_leaves, 
        leave_type:req.body.leavetype_leaves,
        Start_date: req.body.fromdate_leaves  ,
        End_date: req.body.fromdate_leaves ,
        year : req.body.year_leaves,
        document_link:req.body.Document_leaves 
         
  };
        
   console.log(req.body);
   // console.log('values : '+req.body.Facultyid +'&&&'+req.body.Subjectcode +'&&&&'+ req.body.Specilisationcategory);
   let sql = "INSERT INTO faculty_leaves  SET ?";
   let query = connection.query(sql, data,(err, results) => {
     if(err) throw err;
     res.redirect('/');
   });
})

app.post('/showerror', (req, res) => {
    res.send("<h1>Please go back and select appropirate table</h1>")
})

// Server Listening
app.listen(5457, () => {
    console.log('Server is running at port 5454');
});

