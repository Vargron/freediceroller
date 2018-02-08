module.exports={
	checknumberchar:function(char){
		let numbers=["0","1","2","3","4","5","6","7","8","9"];
		let check=false;
		for(let i=0; i<numbers.length;i++){
			if (numbers[i]===char){
				check=true
			}
		}
		return check
	},

	parseRollString:function(str){
		let rollarr=[];// this is the array that will be stored containing instances of [dice size],
		let curindex=0;//tracks current index in while loop
		let checktype="number";
		// check typeswill be number ,numberor+, numberord,
		let numbers=["0","1","2","3","4","5","6","7","8","9"];
		let check;
		let curpair=["",""];//stores as [dice size, number of dice]
		let curargument="num of dice";// switches to "dice size"
		if (str.length==0){
			return false
		}


		if (str[0]=="-"){
			curpair.push(-1)
			curindex=1
		}
		while(curindex<str.length){
			// console.log(curindex, curargument)
			//case 1 /3 checking into
			if (checktype=="number"){

				if (!this.checknumberchar(str[curindex])){
					// console.log("failure")
					return false;
				}else{
					//this if is route x of  xdy
					if (curargument=="num of dice"){
						curpair[0]=curpair[0]+str[curindex]
						checktype="numberord"
						// console.log("waiting for d to parse string")
					}else if(curargument=="dice size"){
						//this route covers arguent y of xdy
						curpair[1]=curpair[1]+str[curindex]
						checktype="numberor+"
						// console.log("waiting for +to parse string")
					}
				}
				//case 2 looking for a end to the number string to start the second side of the pair
			}else if( checktype=="numberord"){
				if(this.checknumberchar(str[curindex])){
					curpair[0]=curpair[0]+str[curindex]
				}else if(str[curindex]=="d" ||str[curindex]=="D"){
					curargument="dice size";
					checktype="number"
					// console.log("switching to number then number or plus")
				}
				else if(str[curindex]=="+"){
					curpair[1]="1";
					rollarr.push([parseInt(curpair[0]),parseInt(curpair[1])])
					curpair=["",""]
				}
				else{ return false}
			}
			else if (checktype=="numberor+"){
				if(this.checknumberchar(str[curindex])){
					curpair[1]=curpair[1]+str[curindex];

				}else if( str[curindex]==="+"){
					if(curpair[3]==-1){
						rollarr.push([parseInt(curpair[0]),parseInt(curpair[1]), -1])
					}
					rollarr.push([parseInt(curpair[0]),parseInt(curpair[1])])
					curpair=["",""]
					checktype="number";
					curargument="num of dice"

				}else if (str[curindex]==="-"){
					rollarr.push([parseInt(curpair[0]),parseInt(curpair[1])])
					curpair=["","", -1]
					checktype="number";
					curargument="num of dice"

				}
				else{
					return false;
				}
			}
			curindex++
		}// breaks while loop

		if(checktype=="numberor+"){
			if( curpair[2]===-1){
				rollarr.push([parseInt(curpair[0]),parseInt(curpair[1]), -1])
			}else{
				rollarr.push([parseInt(curpair[0]),parseInt(curpair[1])])
			}
			curpair=["",""]
		}
		if(checktype=="numberord"){
			if (curpair[2]===-1){
					rollarr.push([parseInt(curpair[0]),1, -1])
			}
			else{
					rollarr.push([parseInt(curpair[0]),1])
			}
		}
		return rollarr
	},
	generateRandomFromRollArray:function(rollarray){
		let sum=0;
		for(let i=0;i<rollarray.length;i++){
			// console.log(rollarray[i], "rolling dice for positionx")
			if(!rollarray[i][2]){
				for(let j=0; j<rollarray[i][0];j++){
					temp=Math.floor(Math.random()*rollarray[i][1])+1
					sum=sum+temp
					// console.log(temp)
				}
			}else{
				for(let j=0; j<rollarray[i][0];j++){
					temp=(Math.floor(Math.random()*rollarray[i][1])+1)
					sum=sum-temp
					// console.log(temp)
				}
			}
		}
		return sum;
	},
	rollString:function(str){
		return this.generateRandomFromRollArray(this.parseRollString(str))
	}
}
