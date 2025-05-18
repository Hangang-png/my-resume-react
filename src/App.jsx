import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import photo from './assets/本人.jpg'; // ✅ 添加这一行

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : {
      name: '',
      age: '',
      gender: '',
      phone: '',
      city: '',
      education: '',
      skills: '',
      experience: '',
      about: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // 添加边框：从 (5, 5) 开始，宽度为页面宽度 - 10，高度为页面高度 - 10
      pdf.setLineWidth(0.2); // 可调线宽
      pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10); // 边框坐标和大小
  
      // 添加图片内容
      const imgProps = pdf.getImageProperties(imgData);
      const contentWidth = pdfWidth - 20;
      const contentHeight = (imgProps.height * contentWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 10, 10, contentWidth, contentHeight);
  
      pdf.save('resume.pdf');
    });
  };


  return (
    <div className="container">
      <div className="header">
        <!--<img src={photo} alt="头像" className="header-photo" />-->
        <p className="word_size">Resume</p>
      </div>

      <form className="form">
        {[
          ['姓名', 'name'],
          ['年龄', 'age'],
          ['性别', 'gender'],
          ['电话', 'phone'],
          ['所在城市', 'city'],
          ['教育背景', 'education'],
          ['技能专长', 'skills'],
          ['项目经验', 'experience'],
          ['自我评价', 'about'],
		  ['求职意向', 'expection'],
        ].map(([label, name]) => (
          <div className="form-group" key={name}>
            <label>{label}：</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>

      <div id="pdf-content">
        <div className="preview">
		{/* 👇 增加了这一部分头像和标题 👇 */}
		    <div className="header">
		      <!--<img src="/本人.jpg" alt="头像" className="header-photo" />-->
		    </div>
          <h2>Resume:</h2>
          <p>👤 姓名：{formData.name}</p>
          <p>🎂 年龄：{formData.age}</p>
          <p>🚻 性别：{formData.gender}</p>
          <p>📞 电话：{formData.phone}</p>
          <p>📍 城市：{formData.city}</p>
          <p>🎓 教育背景：{formData.education}</p>
          <p>🛠️ 技能专长：{formData.skills}</p>
          <p>📁 项目经验：{formData.experience}</p>
          <p>📝 自我评价：{formData.about}</p>
		  <p>📝 求职意向：{formData.expection}</p>
        </div>
      </div>
	  <div className="download-btn">
		<button onClick={handleDownloadPDF}>📄 下载为 PDF</button>
	  </div>
    </div>
  );
}

export default App;
