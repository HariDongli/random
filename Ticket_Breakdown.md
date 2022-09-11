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
        Adds the table for facility agent id mapping to the db (columns: facility id | agent_id | custom_agent_id) and
        Should be able to have the script across different environments (dev, test, qa, prod)
    Details:
        Use the knex migration which is query builder to create tables or build queries (e.g, MySQL, Postgres, Maria)
        1. Assuming it for RDS ( RDS instance of AWS), so with knex migrate:make, be able to a create script and add columns in that script
        2. make sure to run latest, rollback, then latest, migrate to latest -> knex migrate:latest and rollback knex migrate:rollback (in case if we needed to drop the changes in future)
        facility id | agent_id | custom_agent_id
    Effort: 1hr-2hr 


2. Create Schema to track the Facility Shifts and it's assigned agents
    Acceptance:
        Have the table to track the Facility Shifts to agents (columns: facility id , shift id, agent id)
    Details:
       Similar to the ticket 1, use knex to build migration to create table which facility id , shift id, agent id
    Effort: 1hr

3. Modify `getShiftsByFacility` function to support the custom AgentId provided by the Facility and pull the shifts list from newer table
    Acceptance:
        the returned list of shifts should contains the list of shifts each with it's assigned agents and their custom agent id should be reflected.
        Test Coverage should be around 75% for the new code included
    Details:
        modify the function to have the getAgent details code to include the custom agent id based on  facility id and agent id
    Effort: 4-5hr


4. Validate `generateReport` function returns valid pdf format with Custom AgentId provided by the Facility
    Acceptance:
        the report should contain the custom agent id given by facility along with shift details and unit test which validates the pdf.
    Details:
        validate the pdf report produced to ensure the newly added id exists
    Effort: < 30hr 

if any test framework exists for the project then this ticket is for QA
5. Validate the entire custom agent id flow and produced report should contain the custom agent id:
    Acceptance:
        PDF should contain custom agent in the shift details report
    Details:
        Include the test cases to validate
    Effort: 4hr


