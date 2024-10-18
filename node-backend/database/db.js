/* 
Exporting the database configuration:
ส่งออกการตั้งค่าฐานข้อมูล:

- db: Connection string for the MongoDB database.
- The URI specifies the database name as 'db' and the server address as 'localhost' on port '27017'.

- db: สตริงการเชื่อมต่อสำหรับฐานข้อมูล MongoDB
- URI ระบุชื่อฐานข้อมูลว่า 'db' และที่อยู่เซิร์ฟเวอร์ว่า 'localhost' บนพอร์ต '27017'
*/
module.exports = {
    db: 'mongodb://localhost:27017/db'
}