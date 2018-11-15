function setEventStatus(ev) {
    let category = "New";
    console.log('ev ...', ev)
    if (ev.eventName !== ''){
      category = "In Planning"
    }

    if (ev.eventName !== '' &&
      ev.eventDate !== null &&
      ev.organiser !== '' &&
      ev.location !== '' &&
      ev.contact !== '' &&
      ev.budget != null &&
      ev.PlannedAttendance !== null &&
      ev.costPerHead !== null &&
      ev.deductionOffered !== null)
    {
      category = "Planned"

    }
    if (ev.eventName !== '' &&
    ev.eventDate !== null &&
    ev.organiser !== '' &&
    ev.location !== '' &&
    ev.contact !== '' &&
    ev.budget != null &&
    ev.costPerHead !== null &&
    ev.totalCost !== null &&
    ev.deductionOffered !== null &&
    ev.ActualAttendance !== null &&
    ev.setupRatng !== null)
    {
    category = "Actioned"

    }
    return category
}

module.exports = setEventStatus;
