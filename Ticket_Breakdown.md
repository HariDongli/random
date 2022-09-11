# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Create Schema to support the Custom AgentId provided by the Facility
    Acceptance:
        Adds the table for facility agent id mapping to the db and
        Should be able to have the script across different environments (dev, test, qa, prod)
    Details:
        Use the knex migration which is query builder to create tables or build queries (e.g, MySQL, Postgres, Maria)
        1. Assuming it for RDS ( RDS instance of AWS), so with knex migrate:make, be able to a create script and add columns in that script
        2. make sure to run latest, rollback, then latest, migrate to latest -> knex migrate:latest and rollback knex migrate:rollback (in case if we needed to drop the changes in future)
    Effort: 1hr-2hr 


2. Create Schema to track the Facility Shifts and it's assigned agents
    Acceptance:
        Have the table to track the 

    Details:

    Effort: 1hr

3. Modify `getShiftsByFacility` function to support the custom AgentId provided by the Facility and pull the shifts list from newer table
4. Validate `generateReport` function returns valid pdf format with Custom AgentId provided by the Facility