# Mysql

## 为什么要有数据库

没有数据库，我们的数据都是存储在文件当中的，那么文件存储数据的缺点有：

- 文件的安全性问题。
- 文件不利于查询和对数据的管理。
- 文件不利于存放海量数据
- 文件在程序中控制不方便

## 什么是数据库

数据库，简而言之可视为电子化的文件柜——存储电子文件的处所，用户可以对文件中的数据运行增加、删除、修改、查询等操作。

**浏览器**从服务器请求资源，那**服务器**的资源从哪里取到的？ ==> **数据库**

## 数据库的分类

关系型数据库：

- **MySQL**、
- Oracle、
- SQL Server
- SQLite（安卓）

非关系型数据库

- mongodb
- redis
- BigTable

## 数据库中基本术语

- 数据库`database`：存放数据的仓库，一般一个项目中的数据会存储到一个数据库中
- 表`table`： 一个表对应一类数据，比如学生表，老师表   学生信息  老师的信息  文章的信息
- 列`columns`:一张表由多列组成，也叫一个字段，比如学生的姓名，成绩，年龄等
- 行`rows`: 一个学生信息对应一行，一行也叫一条记录。

## 数据库的可视化操作

### 创建数据库

### 创建表

``` sql
存储以下学生信息

{id: 1, name: '张三', age: 18, gender: '男', content: '这是描述信息‘}
```

### 数据类型

`int`: 整数类型

`varchar`: 字符类型

`datetime`: 日期类型

## 数据库的常见命令

<https://blog.csdn.net/qq_43332389/article/details/105420547>

> SQL: 结构化查询语言(Structured Query Language)简称SQL  。用于数据库的增删改查以及管理等功能。

### 数据库相关

- `--`SQL中的注释
- `SHOW DATABASES;` 查看所有的数据
- `CREATE DATABASE mydb;` 创建数据库
- `DROP DATABASE mydb;`删除数据库

- `USE mydb;` 使用数据库

### 表相关

- `SHOW TABLES;`查看当前数据库中所有的表
- 创建表

```sql
CREATE TABLE user(
 id INT auto_increment PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 age INT ,
 gender VARCHAR(4),
 content VARCHAR(255)
)
```

- `DROP TABLE user;`删除表

<https://blog.csdn.net/u012187452/article/details/82120345>

### 插入数据

```sql
INSERT INTO user (name, age, gender, content) VALUES ('张三', 18, '男', '哈哈哈，哈哈哈')
-- 如果省略列名，那么必须要和字段一一对应
INSERT INTO user VALUES (null, '张三', 18, '男', '哈哈哈，哈哈哈')

INSERT INTO user SET name='hcc', age=18, gender='男', content='嘻嘻嘻'
```

### 修改数据

```sql
// 修改所有的数据
UPDATE USER SET name='李四'
// 根据条件修改
UPDATE USER set name='李四', content="这是内容" WHERE id = 2
```

### 删除数据

```sql
// 删除所有的数据
DELETE FROM USER

// 删除id为5的数据
DELETE FROM USER WHERE id = 5
```

### 查询数据

```sql
-- 查询所有数据
SELECT * FROM user

-- 查询指定列
SELECT id, name,age from user


-- 条件查询
-- 查询所有名字叫做张三的数据
select * from lyb where name = 'zs'

-- 组合查询
-- 查询名字叫张三 并且  title为嘻嘻  AND可以连多个条件
select * from lyb where name = 'zs' and title = '嘻嘻';
-- 查询名字叫做张三 或者 李四 or可以链接多个条件，表示或者
select * from lyb where name = 'zs' or name = 'ls';

-- 范围查询
-- 查询名字  在 zs ls ww之间的
select * from lyb where name in ('zs', 'ls', 'ww')

-- 模糊查询
-- 查询所有带s的数据
--          像   % 表示占位，表示可以是任意个字符  _表示占位，只占一个字符
select * from lyb where name like 's_'; 


-- 分页查询  limit 跳过的条数,条数
-- 当前的条数 , 需要的条数
select * from lyb limit 6,3;


-- 排序
--                  根据id排序   规则： asc(默认升序)  desc: 降序
select * from lyb order by id desc;

-- 顺序： 先条件  在排序  在分页
select * from lyb where name like '%s%'  order by id desc limit 0,10

```

```sql
-- 创建数据库
-- create database mydb;

-- 使用数据库
-- use mydb;

-- 查看表
-- show tables;

-- 创建表
-- create table lyb(
--  -- 主键：表中唯一的那项  auto_increment:自动递增
--  id int(11) primary key auto_increment,
--  name varchar(255) not null,
--  title varchar(255),
--  content varchar(5000),
--  time varchar(255)
-- )

-- 增加
-- 插入 到  lyb  指定列          值      对应的值
-- insert into lyb (name, title) values ('hcc', '哈哈哈');

-- 插入数据方式1
-- insert into lyb(name, title, content, time) values ('zs', '嘿嘿嘿', '嘻嘻嘻嘻嘻', '2019-06-11 12:00:00');

-- 插入数据方式2   如果不指定列，代表要给所有的列都指定数据
-- insert into lyb values (null, 'ls', '哇哇哇', '嘎嘎嘎嘎', '2019-06-11 12:00:02');

-- 插入数据方式3
-- insert into lyb set xxx = xxx,  xxx = xxx;
-- insert into lyb set name='ww', title="呜呜呜呜", content="呵呵呵呵", time="2019-06-11 12:00:00";



-- 修改语法
-- 更新 表名 设置    修改的值     条件
-- update lyb  set name="张三"

-- 就想把id为3的name改成李四

--                        条件
-- update lyb set name="李四" where id = 3;

-- update lyb set name="胡聪聪", content="嘤嘤嘤", time="2019-06-11 09:00:00" where id = 1


-- 删除数据
-- 删除  从    表
-- drop table lyb;  删除表，整个表都删除了
-- 把表里的数据给清空了 慎用   从删库到跑路（违法）  后门 隐蔽
-- delete from  lyb 

-- delete from lyb where id = 5;



-- 查询数据
-- 选择 列 form  表
-- 从留言板中查询所有的 名字
-- select id, name, title from lyb;
-- *表示所有的列
-- select * from lyb;

-- 查询所有名字叫做张三的数据
-- select * from lyb where name = 'zs'

-- 查询名字叫张三 并且  title为嘻嘻  AND可以连多个条件
-- select * from lyb where name = 'zs' and title = '嘻嘻';

-- 查询名字叫做张三 或者 李四 or可以链接多个条件，表示或者
-- select * from lyb where name = 'zs' or name = 'ls';

-- 查询名字  在 zs ls ww之间的
-- select * from lyb where name in ('zs', 'ls', 'ww')


-- 查询所有带s的数据
-- 模糊查询                   像   % 表示占位，表示可以是任意个字符  _表示占位，只占一个字符
-- select * from lyb where name like 's_'; 


-- 分页查询  limit 跳过的条数,条数
-- 为什么服务器需要： 当前页  条数
-- 当前的条数 , 需要的条数
-- select * from lyb limit 6,3;

-- 排序
--                  根据id排序   规则： asc(默认升序)  desc: 降序
-- select * from lyb order by id desc;


-- 顺序： 先条件  在排序  在分页
select * from lyb where name like '%s%'  order by id desc limit 0,10
```

## node操作mysql

### 基本使用

- 安装

```bash
npm install mysql
```

- 基本使用

```js
// 导入第三方包
const mysql = require('mysql')
// 创建连接
let connection = mysql.createConnection({
  // 本地
  host: 'localhost',
  user: 'root',
  password: 'root',
  // 数据库名称
  database: 'mydb',
  port: 3306
})

// 连接数据库
connection.connect()

// 执行sql语句
connection.query('select * from user where id = 8', (err, result) => {
  if (err) return console.log('查询失败', err)
  // result返回的是数组， 数组中是一个对象
  console.log(result)
})

// 关闭连接
connection.end()

```

### 查询语句

```js
let name = 'hcc'
// 使用?表示占位，可以防止sql注入 " or 1 = 1"
connect.query(`select * from user where name=?`, name, (err, result) => {
  if (err) return console.log('错误了', err)
  console.log(result)
})
```

### 插入语句

```js
connect.query(
  'insert into user (name, age, gender, content) values (?, ?, ?, ?)',
  ['王五', 18, '男', '哈哈哈哈'],
  err => {
    if (err) return console.log('错误', err)
    console.log('添加成功了')
  }
)

// 方式2
connect.query(
  'insert into user set ?',
  {
    name: '小赵',
    age: 30,
    gender: '男',
    content: '哈哈哈'
  },
  (err, result) => {
    if (err) return console.log('错误', err)
    console.log('添加成功了', result)
  }
)

```

### 修改语句

```js
connect.query(
  'update user set ? where id = ?',
  [
    {
      name: '小孙',
      age: 30,
      gender: '男',
      content: '哈哈哈'
    },
    10,  
  ],
  (err, result) => {
    if (err) return console.log('错误', err)
    console.log('添加成功了', result)
  }
)
```

### 删除语句

```js
connect.query('delete from user where id = ?', [10], (err, result) => {
  if (err) return console.log('失败', err)
  console.log(result)
})
```

### 连接池的使用

一个一个的创建新的链接比较消耗性能，因此推荐使用连接池的方式建立链接

```js
let mysql = require('mysql');
let pool  = mysql.createPool({
  connectionLimit : 10,
    // 本地
  host: 'localhost',
  user: 'root',
  password: 'root',
  // 数据库名称
  database: 'mydb',
  port: 3306
});
```
