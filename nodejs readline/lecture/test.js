const readline=require("readline")
const fs=require("fs")
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let draw=""

rl.question("width of rectangle?\n",(width)=>{
    rl.question("height of rectangle?\n",(height)=>{
        rl.question("file name?\n",(fileName)=>{

            for(i=1;i<=height;i++){
                for (let j = 1; j <= width; j++) {
                    draw+="*"
                }
                draw+="\n"
            }
            fs.writeFile((fileName),draw,err=>{
              if(err){console.error(err)}
              else{
                console.log(`Wrote file named ${fileName}`)
              }
            })
            rl.close()
        })
    })
})