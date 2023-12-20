window.addEventListener('DOMContentLoaded', init);

function init()
{
    // show light/dark mode button if javascript is on
    showThemeBtn();

    // handle local storage and themes
    themeHandler();

    // handle form validation and errors
    nameHandler();
    emailHandler();
    commHandler();
    formHandler();
}

function showThemeBtn()
{
    // grab the theme button
    const themeBtn = document.querySelector('nav > label[for="theme-btn"]');

    // make the button visible
    themeBtn.style.visibility = 'visible';
}

function themeHandler()
{
    // grab elements
    const theme = localStorage.getItem('theme');
    const checkbox = document.querySelector('nav > input#theme-btn');
    const icon = document.querySelector('nav > label[for="theme-btn"] use');

    checkbox.addEventListener('change', swapTheme);

    // switch the themes
    function swapTheme(e)
    {
        if (e.currentTarget.checked === true)
        {
            document.body.setAttribute('data-theme', 'dark');
            icon.setAttribute('href', '/assets/icons/moon-solid.svg#moon-solid');
            localStorage.setItem('theme', 'dark');
        }
        else
        {
            document.body.setAttribute('data-theme', 'light');
            icon.setAttribute('href', '/assets/icons/sun-solid.svg#sun-solid');
            localStorage.setItem('theme', 'light');
        }
    }

    // if local storage is empty, create a new item
    if (theme === null)
    {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else
    {
        // the page loads with light by default, so only check for previous dark theme and set it if true
        if (theme === 'dark')
        {
            document.body.setAttribute('data-theme', 'dark');
            icon.setAttribute('href', '/assets/icons/moon-solid.svg#moon-solid');
            checkbox.checked = true;
        }
    }
}

function nameHandler()
{
    // grab elements
    const nameInput = document.querySelector('#hw4 input#name');
    const nameWarning = document.querySelector('#hw4 output[for="name"]');
    const nameError = document.querySelector('#hw4 output[for="name"] + output');

    // event listener for user input
    nameInput.addEventListener('input', nameValidate);

    // display characters remaining and default errors (incase submit button is pressed immediately)
    nameWarning.textContent = `Characters Remaining: ${nameInput.getAttribute('maxlength') - nameInput.value.length}`;
    nameError.textContent = 'Error: No input';
    nameInput.setCustomValidity("Error: No input");

    function nameValidate()
    {
        // update the characters remaining and change color based on percentage used
        nameWarning.textContent = `Characters Remaining: ${nameInput.getAttribute('maxlength') - nameInput.value.length}`;
        
        if (nameInput.value.length < 0.75 * nameInput.getAttribute('maxlength'))
        {
            nameWarning.style.color = 'cornflowerblue';
        }
        else
        {
            if (nameInput.value.length < nameInput.getAttribute('maxlength'))
            {
                nameWarning.style.color = 'orange';
            }
            else
            {
                nameWarning.style.color = "red";
            }
        }

        // reset validity, otherwise there will always be an error
        nameInput.setCustomValidity("");

        // check if there is any type of error and fire invalid event if there is
        if (nameInput.checkValidity())
        {
            nameError.textContent = "No Error";
        }
        else
        {
            // check if there is a value
            if (nameInput.validity.valueMissing)
            {
                nameError.textContent = "Error: No input";
                nameInput.setCustomValidity("Error: No input");
            }
            else
            {
                // check if minimum length is met
                if (nameInput.validity.tooShort)
                {
                    nameError.textContent = "Error: Input is too short";
                    nameInput.setCustomValidity("Error: Input is too short");
                }
                else
                {
                    // check if maximum length is met
                    if (nameInput.validity.tooLong)
                    {
                        nameError.textContent = "Error: Input is too long";
                        nameInput.setCustomValidity("Error: Input is too long");
                    }
                    else
                    {
                        // check if regex based on the pattern attribute is matching
                        if (nameInput.validity.patternMismatch)
                        {
                            nameError.textContent = "Error: Invalid characters";
                            nameInput.setCustomValidity("Error: Invalid characters");
                        }
                    }
                }
            }
        }
    }
}

function emailHandler()
{
    // grab elements
    const emailInput = document.querySelector('#hw4 input#email');
    const emailWarning = document.querySelector('#hw4 output[for="email"]');
    const emailError = document.querySelector('#hw4 output[for="email"] + output');

    // event listener for user input
    emailInput.addEventListener('input', emailValidate);

    // display characters remaining and default errors (incase submit button is pressed immediately)
    emailWarning.textContent = `Characters Remaining: ${emailInput.getAttribute('maxlength') - emailInput.value.length}`;
    emailError.textContent = 'Error: No input';
    emailInput.setCustomValidity("Error: No input");

    function emailValidate()
    {
        // update the characters remaining and change color based on percentage used
        emailWarning.textContent = `Characters Remaining: ${emailInput.getAttribute('maxlength') - emailInput.value.length}`;
        
        if (emailInput.value.length < 0.75 * emailInput.getAttribute('maxlength'))
        {
            emailWarning.style.color = 'cornflowerblue';
        }
        else
        {
            if (emailInput.value.length < emailInput.getAttribute('maxlength'))
            {
                emailWarning.style.color = 'orange';
            }
            else
            {
                emailWarning.style.color = "red";
            }
        }

        // reset validity, otherwise there will always be an error
        emailInput.setCustomValidity("");

        // check if there is any type of error and fire invalid event if there is
        if (emailInput.checkValidity())
        {
            emailError.textContent = "No Error";
        }
        else
        {
            // check if there is a value
            if (emailInput.validity.valueMissing)
            {
                emailError.textContent = "Error: No input";
                emailInput.setCustomValidity("Error: No input");
            }
            else
            {
                // check if minimum length is met
                if (emailInput.validity.tooShort)
                {
                    emailError.textContent = "Error: Input is too short";
                    emailInput.setCustomValidity("Error: Input is too short");
                }
                else
                {
                    // check if maximum length is met
                    if (emailInput.validity.tooLong)
                    {
                        emailError.textContent = "Error: Input is too long";
                        emailInput.setCustomValidity("Error: Input is too long");
                    }
                    else
                    {
                        // check if the input matches the type attribute (email)
                        if (emailInput.validity.typeMismatch)
                        {
                            emailError.textContent = "Error: Enter a valid email address";
                            emailInput.setCustomValidity("Error: Enter a valid email address");
                        }
                    }
                }
            }
        }
    }
}

function commHandler()
{
    // grab elements
    const commInput = document.querySelector('#hw4 textarea#comments');
    const commWarning = document.querySelector('#hw4 output[for="comments"]');
    const commError = document.querySelector('#hw4 output[for="comments"] + output');

    //desired regex pattern (basically no emojis or odd characters)
    const pattern = new RegExp(/^[a-zA-Z0-9!@#$%^&*()_+{}|:\"<>?=\[\]\-';.,\/\\ ]*$/);

    // event listener for user input
    commInput.addEventListener('input', commValidate);

    // display characters remaining and default errors (incase submit button is pressed immediately)
    commWarning.textContent = `Characters Remaining: ${commInput.getAttribute('maxlength') - commInput.value.length}`;
    commError.textContent = 'Error: No input';
    commInput.setCustomValidity("Error: No input");

    function commValidate()
    {
        // update the characters remaining and change color based on percentage used
        commWarning.textContent = `Characters Remaining: ${commInput.getAttribute('maxlength') - commInput.value.length}`;
        if (commInput.value.length < 0.75 * commInput.getAttribute('maxlength'))
        {
            commWarning.style.color = 'cornflowerblue';
        }
        else
        {
            if (commInput.value.length < commInput.getAttribute('maxlength'))
            {
                commWarning.style.color = 'orange';
            }
            else
            {
                commWarning.style.color = "red";
            }
        }

        // reset validity, otherwise there will always be an error
        commInput.setCustomValidity("");

        // check if the input matches the regex (this must be done first, 
        // since checkValidity() will not error since the HTML did not provide a pattern and it does not check javascript)
        if (!pattern.test(commInput.value))
        {
            commError.textContent = "Error: Invalid characters";
            commInput.setCustomValidity("Error: Invalid characters");
        }

        // check if there is any type of error and fire invalid event if there is
        if (commInput.checkValidity())
        {
            commError.textContent = "No Error";
        }
        else
        {
            // check if there is a value
            if (commInput.validity.valueMissing)
            {
                commError.textContent = "Error: No input";
                commInput.setCustomValidity("Error: No input");
            }
            else
            {
                // check if minimum length is met
                if (commInput.validity.tooShort)
                {
                    commError.textContent = "Error: Input is too short";
                    commInput.setCustomValidity("Error: Input is too short");
                }
                else
                {
                    // check if maximum length is met
                    if (commInput.validity.tooLong)
                    {
                        commError.textContent = "Error: Input is too long";
                        commInput.setCustomValidity("Error: Input is too long");
                    }
                }
            }
        }
    }
}

function formHandler()
{
    // grab elements
    const nameInput = document.querySelector('#hw4 input#name');
    const emailInput = document.querySelector('#hw4 input#email');
    const commInput = document.querySelector('#hw4 textarea#comments');
    const form = document.querySelector('#hw4 form');

    // array of objects for form errors
    const form_errors = [
        {
            'input': 'name',
            'errors': []
        },
        {
            'input': 'email',
            'errors': []
        },
        {
            'input': 'comments',
            'errors': []
        }
    ];

    // event listeners for when checkValidity() errors and for form submission
    nameInput.addEventListener('invalid', nameInvalid);
    emailInput.addEventListener('invalid', emailInvalid);
    commInput.addEventListener('invalid', commInvalid);
    form.addEventListener('submit', formSubmit);

    //for each of these functions, we can add the error to the form_errors array
    function nameInvalid(e)
    {
        form_errors[0]['errors'].push(e.target.value);
    }

    function emailInvalid(e)
    {
        form_errors[1]['errors'].push(e.target.value);
    }

    function commInvalid(e)
    {
        form_errors[2]['errors'].push(e.target.value);
    }

    function formSubmit(e)
    {
        // prevent redirect
        e.preventDefault();
        
        // grab the original form
        const input = document.createElement('input');

        // add an input with the form_errors object  to the form
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'form_errors');
        input.setAttribute('value', JSON.stringify(form_errors));

        form.appendChild(input);

        // now resubmit and allow redirect
        e.currentTarget.submit();
    }
}