//Listen for submit button
document.getElementById('loan-form').addEventListener('submit', function(event){
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    //show for 2 seconds before calculations appear
    setTimeout(calculateResults, 2000);

    event.preventDefault();  //-> because we have now put this inside of unnamed listener with no event object, we place this here
});

function calculateResults(){
    console.log('Calculating...');
    
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';
        //hide loading image
        document.getElementById('loading').style.display = 'none';

    }else{
        console.log('Error: Check numbers!');
        //hide loading gif
        document.getElementById('loading').style.display = 'none';
        //show error message
        showError('Error: Please check your numbers have been entered correctly!');
    }
}

//Show error function
function showError(error){
    //create div
    const errorDiv = document.createElement('div');

    //get elements for the insertBefore method - see below
    const card = document.querySelector('.card'); //parent div
    const heading = document.querySelector('.heading'); //div we want the new div to appear before

    //add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error message above heading, inside of parent element which is card
    card.insertBefore(errorDiv, heading);

    //clear error - don't want error message to remain b/c it is not kiff for user experience my bru, so use window object to get it to disappear on the quicks

    //clear error after 3 seconds
    setTimeout(clearError, 3000); //timer is run using milliseconds
}

//clear error - I wanted the error message to fade away, but for now I haven't got that to work just yet :/
function clearError(){
    const alert1 = document.querySelector('.alert.alert-danger');
    console.log(alert1);
    console.log(alert1.style.opacity);
    if(alert1.style.opacity >= 1){
        alert1.style.opacity - 0.01;
        console.log('disappearing');
    }else if(alert1.style.opacity <= 0){
        alert1.remove();
        console.log('gone');
    }
    
}
