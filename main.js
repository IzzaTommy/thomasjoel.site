window.addEventListener('DOMContentLoaded', init);

function init()
{
    // show light/dark mode button if javascript is on
    showThemeBtn();

    // handle local storage and themes
    themeHandler();
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
