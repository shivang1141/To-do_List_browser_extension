Description:
This is a to-do list Chrome extension that allows the user to add, update, and delete tasks. The extension saves the tasks in the Chrome storage so that they persist even after the browser is closed. The tasks can be marked as complete and cleared all at once.

Key Features:
1. Add and save tasks in the Chrome storage
2. Mark tasks as complete
3. Clear completed tasks
4. Persistent storage of tasks
5. Count of active tasks displayed

Design:
The design of the extension is simple and functional. The user interface consists of a form to add tasks, a list to display the tasks, and a counter that shows the number of active tasks. The tasks are displayed in a minimalist style with a checkbox to mark them as complete, a span to show the task text, and a delete button to remove the task. The color palette is a dark theme with shades of gray, making it easy on the eyes.



Here are the steps to test an extension in Google Chrome:

    Open Google Chrome and navigate to chrome://extensions/ in the address bar.
    Turn on Developer Mode by clicking the toggle switch in the top right corner of the page.
    Click the Load unpacked button and select the folder containing your extension's files.
    The extension should now appear in the list of extensions on the chrome://extensions/ page.
    You can now test your extension by using it in the browser and checking that it functions as expected.
    Note that changes you make to the code will not be reflected in the temporary extension until you reload it in the chrome://extensions/ page.


Usage
    To use the Todo List extension, click the extension icon in the Chrome browser toolbar (it should look like a checklist). A popup window will appear displaying the to-do list interface. Add tasks by typing into the input field and pressing the "Add" button or pressing "Enter". To mark a task as completed, check the checkbox next to the task. To delete a task, click the "Delete" button next to the task. To clear all completed tasks, click the "Clear completed tasks" button.

Files
    popup.html: The HTML file that defines the layout of the to-do list interface.
    popup.js: The JavaScript file that handles the functionality of the to-do list application.
    styles.css: The CSS file that styles the to-do list interface.
    manifest.json: The manifest file that defines the extension properties, permissions, and icons


