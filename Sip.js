const InvestedAmountInput=document.querySelector(".loan-amount");
const interestRateInput=document.querySelector(".interest-rate");
const TenureInput=document.querySelector(".loan-tenure");

const TotalInvestedvalue=document.querySelector(".loan-emi .value");
const EstimatedReturnValue=document.querySelector(".total-interest .value");
const TotalAmountValue=document.querySelector(".total-amount .value");

const calculateBtn=document.querySelector(".btn");

let investedAmount=parseFloat(InvestedAmountInput.value);
let interestRate=parseFloat(interestRateInput.value);
let Tenure=parseFloat(TenureInput.value);

let interest=interestRate/12/100;
let myChart;

const checkvalues=()=>{
    let invrestedAmountValue=InvestedAmountInput.value;
    let interestRateValue=interestRateInput.value;
    let TenureVlaue=TenureInput.value;
    let regexnumber=/^[0-9]+$/;
    if(!invrestedAmountValue.match(regexnumber)){
        InvestedAmountInput.value="10000";
    }
    if(!TenureVlaue.match(regexnumber)){
        TenureInput.value="12";
    }
    let regexdecimalnumber=/^(\d*\.)?\d+$/;
    if(!interestRateValue.match(regexdecimalnumber)){
        interestRateInput.value="12";
    }
}

const displayChart=(investedTotalAmount,returnReceive)=>{
const ctx = document.getElementById('myChart').getContext('2d');
 myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Total Invested Amount', 'Estimated Returns'],
        datasets: [{
            data: [investedTotalAmount,returnReceive],
            backgroundColor: ["#F83292","#814096"],
            borderWidth: 1,
        },],
    },
});
};

const updateChart=(investedTotalAmount,returnReceive)=>{
    myChart.data.datasets[0].data[0]=investedTotalAmount;
    myChart.data.datasets[0].data[1]=returnReceive;
    myChart.update();
}

const calculateTotalAmount=()=>{
    checkvalues();
    refreshInputValues();
    let maturity=investedAmount*((Math.pow(1+interest,Tenure) - 1)/interest)*(1+interest);

    return maturity;
};

const update=(maturity)=>{
    let y = Math.round(Tenure*investedAmount);
    TotalInvestedvalue.innerHTML = y;
    let TotalAmount = Math.round(maturity);
    TotalAmountValue.innerHTML=TotalAmount;
    let returnReceive=Math.round(TotalAmount-y);
    EstimatedReturnValue.innerHTML=returnReceive;

    if(myChart){
        updateChart(y,returnReceive);
    }
    else{
        displayChart(y,returnReceive);
    }
};

const refreshInputValues=()=>{
    investedAmount=parseFloat(InvestedAmountInput.value);
    interestRate=parseFloat(interestRateInput.value);
    Tenure=parseFloat(TenureInput.value);
    interest=interestRate/12/100;
};

const init=()=>{
    refreshInputValues();
    let maturity=calculateTotalAmount();
    update(maturity);
};
init();

calculateBtn.addEventListener("click",()=>{
    refreshInputValues();
    let maturity=calculateTotalAmount();
    update(maturity);
});