/// <reference path="./steps.d.ts" />
Feature('Homepage test.js');
//test that home page loads everything
Scenario('Homepage layout', (I) => {
  I.amOnPage('/')
  I.seeElement('.wrapper')
  I.seeElement('h1')
  I.seeElement('h2')
  I.seeElement('h3')
  I.seeElement('.search')
  I.appendField('#searchField', 'appended');
  I.seeElement('#imgAllstate')
  I.seeElement('.headbar')
  I.see('Sports & Social Committee')
  I.seeInField('.search input','')
  I.seeElement('.sidebar')
  I.seeElement('.sidebar-panel')
  I.seeElement('.vl')
  I.click('.search button')
  I.seeElement('.main-body')

  I.click('Home')
  I.see('Welcome to Sports and social')
  I.see('Here are the Committee members:')
  I.seeElement('#UpdateMembers')
  I.seeElement('.image-grid')
  I.seeElement('.row')
  I.seeElement('.column')
  I.moveCursorTo('.hover-animation.one');
  I.seeElement('.hover-animation.one' ,'Caroline: Seat location: 3N')


  I.moveCursorTo('.hover-animation.two');
  I.seeElement('.hover-animation.two', 'Ruth: Seat Location: 3N')
  I.moveCursorTo('.hover-animation.three');
  I.seeElement('.hover-animation.three', 'Eoghan: ')
  I.moveCursorTo('.hover-animation.four');
  I.seeElement('.hover-animation.four', 'Jim: ')
  I.moveCursorTo('.hover-animation.five');
  I.seeElement('.hover-animation.five', 'Jonathan: ')
  I.moveCursorTo('.hover-animation.six');
  I.seeElement('.hover-animation.six', 'Orla: ')
  I.moveCursorTo('.hover-animation.seven');
  I.seeElement('.hover-animation.seven', 'Patrick: ')
  I.moveCursorTo('.hover-animation.eight');
  I.seeElement('.hover-animation.eight', 'Richie: ')
  I.moveCursorTo('.hover-animation.nine');
  I.seeElement('.hover-animation.nine', 'Paul: ')
  I.moveCursorTo('.hover-animation.ten');
  I.seeElement('.hover-animation.ten', 'Carina: ')

  I.click('New Event')
  I.see('Select type of event to start planning:')
  I.seeNumberOfVisibleElements('.EventButton',5)
  I.click('Home')

  I.click('Edit Event')
  I.seeNumberOfVisibleElements('.EventTitle',5)
  I.click('Home')

  I.click('Previous Events')
  I.seeElement('#table')
  I.click('Home')
});

//test that update members page loads everything
Scenario('Update Members layout', (I) => {
  I.amOnPage('/updatemembers')
  I.seeElement('.wrapper')
  I.seeElement('.search')
  I.appendField('#searchField', 'appended');
  I.seeElement('#imgAllstate')
  I.seeElement('.headbar')
  I.see('Sports & Social Committee')
  I.seeInField('.search input','')
  I.seeElement('.sidebar')
  I.seeElement('.sidebar-panel')
  I.seeElement('.vl')
  I.click('.search button')
  I.seeElement('.main-body')

  I.click('Home')
  I.seeElement('#UpdateMembers')
  I.click('Update Members')

  I.seeElement('#memberstable')
  I.see('Name')
  I.see('Location')
  I.see('Photo')
});

//test that new events page loads everything
Scenario('New event layout', (I) => {
  I.amOnPage('/planevent')
  I.seeElement('.wrapper')
  I.seeElement('h2')
  I.seeElement('.search')
  I.seeElement('#imgAllstate')
  I.seeElement('.headbar')
  I.see('Sports & Social Committee')
  I.seeInField('.search input','')
  I.appendField('#searchField', 'appended');
  I.seeElement('.sidebar')
  I.seeElement('.sidebar-panel')
  I.seeElement('.vl')
  I.click('.search button')
  I.seeElement('.main-body')

  I.click('New Event')
  I.see('Select type of event to start planning:')
  I.seeNumberOfVisibleElements('.EventButton',5)
  I.seeElement('.tablink1')
  I.seeElement('.tablink2')
  I.seeElement('.tablink3')
  I.seeElement('.tablink4')
  I.seeElement('.tablink5')
  I.seeElementInDOM('#Annual');
  I.seeElementInDOM('#Monthly');
  I.seeElementInDOM('#Weekly');
  I.seeElementInDOM('#One-offs');
  I.seeElementInDOM('#Sundries');
  I.click('Annual')
  I.see('Create an annual event..')
  I.see('Event Name:')
  I.see('Enter date of event:')
  I.see('Organiser:')
  I.see('Location:')
  I.see('Contact:')
  I.see('Budget:')
  I.see('Cost per head:')
  I.see('Total Cost')
  I.see('Deduction Offered:')
  I.see('Attendance:')
  I.see('Rate Event Setup:')
  I.see('Additional Notes:')
  I.see('Instructions:')
  I.appendField('#eventName', 'appended');
  I.appendField('#organiser', 'appended');
  I.appendField('#location', 'appended');
  I.appendField('#contact', '123');
  I.appendField('#budget', '123');
  I.appendField('#costPerHead', 'a123');
  I.appendField('#totalCost', '123');
  I.appendField('#deductionOffered', '123');
  I.appendField('#attendance', '123');
  I.appendField('#date', '01/12/2018');
  I.click('☆')
  I.appendField('#additionalNotes', 'appended');
  I.appendField('#instructions', 'appended');
  I.seeElementInDOM('#eventType')
  I.click('Save')
  I.acceptPopup()
  I.acceptPopup()
  I.click('New Event')
  I.click('Annual')
  I.click('Back')
  // How to test for an alert pop up
  I.acceptPopup()

  I.click('Home')
  I.see('Welcome to Sports and social')
  I.click('New Event')

  I.click('Edit Event')
  I.see('Click on event name to edit or delete event:')
  I.seeNumberOfVisibleElements('.EventTitle',5)
  I.click('appended')
  I.click('Delete')
  I.acceptPopup()
  I.dontSee('appended')

});

//test that edit events page loads everything
Scenario('Edit event layout', (I) => {
  I.amOnPage('/updateevent')
  I.seeElement('.wrapper')
  I.seeElement('h2')
  I.seeElement('.search')
  I.seeElement('#imgAllstate')
  I.seeElement('.headbar')
  I.see('Sports & Social Committee')
  I.seeInField('.search input','')
  I.appendField('#searchField', 'appended');
  I.seeElement('.sidebar')
  I.seeElement('.sidebar-panel')
  I.seeElement('.vl')
  I.click('.search button')
  I.seeElement('.main-body')

  I.click('Edit Event')
  I.see('Click on event name to edit or delete event:')
  I.seeNumberOfVisibleElements('.EventTitle',5)

  I.seeNumberOfElements('#updateTable',5)

  I.click('Home')
  I.see('Welcome to Sports and social')
  I.click('Edit Event')

  I.click('New Event')
  I.see('Select type of event to start planning:')
  I.seeNumberOfVisibleElements('.EventButton',5)
  I.click('Edit Event')

  I.click('Previous Events')
  I.seeElement('#table')

});

//test that previous events page loads everything
Scenario('Previous Events layout', (I) => {
  I.amOnPage('/eventhistory')
  I.seeElement('.wrapper')
  I.seeElement('h2')
  I.seeElement('.search')
  I.seeElement('#imgAllstate')
  I.seeElement('.headbar')
  I.see('Sports & Social Committee')
  I.seeInField('.search input','')
  I.appendField('#searchField', 'appended');
  I.seeElement('.sidebar')
  I.seeElement('.sidebar-panel')
  I.seeElement('.vl')
  I.click('.search button')
  I.seeElement('.main-body')
  I.click('Previous Events')
  I.seeElement('#table')

  I.click('Home')
  I.see('Welcome to Sports and social')
  I.click('Edit Event')

  I.click('New Event')
  I.see('Select type of event to start planning:')
  I.seeNumberOfVisibleElements('.EventButton',5)
  I.click('Previous Events')

  I.click('Edit Event')
  I.see('Click on event name to edit or delete event:')
  I.seeNumberOfVisibleElements('.EventTitle',5)
  I.click('Previous Events')
});

// test for setting event status i.e, New, In Planning, Planned, Action, Archived
Scenario('Test for setting all event statuses, i.e New, In Planning, Planned, Action, Archived', (I) => {

  I.amOnPage('/planevent')
  I.click('Annual')
  I.seeElement('.status')
  I.see('New')

  I.appendField('#eventName', 'test');
  I.appendField('#organiser', 'Bill');
  I.click('Save')
  I.acceptPopup()
  I.acceptPopup()
  I.click('Edit Event')
  I.click('test')
  I.seeElement('.status')
  I.seeInField('#eventStatus', 'In Planning');

  I.appendField('#location', 'appended');
  I.appendField('#contact', '123');
  I.appendField('#budget', '123');
  I.appendField('#costPerHead', '123');
  I.appendField('#totalCost', '123');
  I.appendField('#deductionOffered', '123');
  I.appendField('#date', '01/12/2018');
  I.click('☆')
  I.click('Update')
  I.acceptPopup()
  I.acceptPopup()
  I.click('test')
  I.seeInField('#eventStatus', 'Planned');

  I.appendField('#attendance', '123');
  I.click('Update')
  I.acceptPopup()
  I.acceptPopup()
  I.click('test')
  I.seeInField('#eventStatus', 'Actioned');
  I.click('Delete')
  I.acceptPopup()
  I.dontSee('test')
});

// Test for update members button and side bar sub heading Update members
Scenario('Test for update members button and sidebar sub heading', (I) => {
  I.amOnPage('/')
  I.seeElement('.veryimportantandvitalbutton')
  I.click('Update Members')
  I.seeElement('.avatar')
  I.see('Update members')
  I.click('Home')
  I.dontSee('Update members')
});

//Test that search bar works
Scenario('Test for search', (I) => {
  I.amOnPage('/')
  I.seeElement('.search')
  I.seeInField('.search input','')
  I.appendField('#searchField', 'append')
  I.click('.search button')
  I.wait(2)
});

//test for save alert working and save events works
Scenario('Test for Save Alert', (I) => {
  I.amOnPage('/planevent')
  I.see('Select type of event to start planning:')
  I.click('Annual')
  I.see('Create an annual event..')
  I.appendField('#eventName', 'test name');
  I.appendField('#date', '24/12/2018');
  I.appendField('#organiser', 'Bill');
  I.click('Save')
  I.cancelPopup()
  I.acceptPopup()
  I.see('Create an annual event..')
  I.click('Save')
  I.acceptPopup()
  I.acceptPopup()
  I.see('Select type of event to start planning:')
  I.click('Edit Event')
  I.see('test name')
  I.click('test name')
  I.see('test name')
  I.see('24/12/2018')
  I.see('Bill')
  I.click('Delete')
  I.acceptPopup()
  I.dontSee('test name')

});

//Test for Back alert working and back works
Scenario('Test for Back Alert', (I) => {
  I.amOnPage('/planevent')
  I.see('Select type of event to start planning:')
  I.seeNumberOfVisibleElements('.EventButton',5)
  I.seeElement('.tablink1')
  I.seeElement('.tablink2')
  I.seeElement('.tablink3')
  I.seeElement('.tablink4')
  I.seeElement('.tablink5')
  I.seeElementInDOM('#Annual');
  I.seeElementInDOM('#Monthly');
  I.seeElementInDOM('#Weekly');
  I.seeElementInDOM('#One-offs');
  I.seeElementInDOM('#Sundries');
  I.click('Annual')
  I.see('Create an annual event..')
  I.see('Event Name:')
  I.appendField('#eventName', 'appended');
  I.click('Back')
  I.cancelPopup()
  I.click('Back')
  I.acceptPopup()
  I.see('Select type of event to start planning:')
  I.seeNumberOfVisibleElements('.EventButton',5)
  I.dontSee('Create an annual event..')
});

//Test that updating events works
Scenario('Test for Update', (I) => {
  I.amOnPage('/updateevent')
  I.see('Click on event name to edit or delete event:')
  I.seeNumberOfVisibleElements('.EventTitle',5)

  I.click('New Event')
  I.click('Annual')
  I.see('Create an annual event..')
  I.see('Event Name:')
  I.appendField('#eventName', 'appended');
  I.click('Save')
  I.acceptPopup()
  I.acceptPopup()

  I.click('Edit Event')
  I.click('appended')

  I.appendField('#eventName', 'appended');
  I.click('Update')
  I.acceptPopup()
  I.acceptPopup()
  I.see('appendedappended')
});

//Test for delete alert working and deleting events works
Scenario('Test for Delete Alert', (I) => {
  I.amOnPage('/updateevent')
  I.see('Click on event name to edit or delete event:')
  I.seeNumberOfVisibleElements('.EventTitle',5)

  I.click('appendedappended')
  I.click('Delete')
  I.cancelPopup()
  I.click('Delete')
  I.acceptPopup()
  I.dontSee('appendedappended')
});
