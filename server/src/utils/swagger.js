const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "منصة نحيا بالقرآن لتعليم قراءة القرآن",
      description:
        "منصة نحيا بالقرآن تتيح للمعلمين والطلاب تسجيل حسابا لهم حيث يمكن للطلاب الاطلاع على جميع المعلمين وخدماتهم وبناء على ذلك يستطيع الطالب أن يحدد أي معلم سيلتحق به. أيضا بالنسبة للمعلمين سيكون متاح لهم تسجيل خدماتهم وقبول الطلاب الملتحقين ونشر مناهجهم وعقد امتحانات للطلبة وفتح فيديو اجتماع",
      version: "1.0.0",
      contact: {
        name: "Mahmoud Khalid",
        url: "https://my-portfolio-khalid.netlify.app",
        email: "m.khalid.samra@gmail.com",
      },
    },
    servers: [{ url: "https://tahfeeth-system.onrender.com" }],
  },
  apis: ["./src/utils/*.js", "./src/model/*.js"],
};
const spaces = swaggerJsDoc(options);

function docs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spaces));
}

module.exports = { docs };
