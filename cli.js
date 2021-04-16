#!/usr/bin/env node

console.log("hello world!")
//脚手架工作原理
//1.通过命令行交互询问用户问题
//2.根据用户回答的结果生成文件
const inquirer =  require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
inquirer.prompt([
    {
        type:"input",
        name:"name",
        message:"Your Project name"
    }
]).then(answers=>{
    console.log(answers)
    //根据答案生成

    //模板路径
    const tmpDir = path.join(__dirname,'templates')
    //目标路径 命令在哪里执行，路径就是什么
    const desDir = process.cwd();
    //将模板下所有的文件全部转换到目标目录
    fs.readdir(tmpDir,(err,files)=>{
        if(err) throw err
        files.forEach(file=>{
            //通过模板引擎渲染文件
            ejs.renderFile(path.join(tmpDir,file),answers,(err,result)=>{
                if(err) throw err
                console.log(result)
                fs.writeFileSync(path.join(desDir,file),result)
            })
        })
    })
})