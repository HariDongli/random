# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here


1. First i have written the unit tests, and while writing and viewing the given code, i have constructed the problem statement which is like below
    1. no event or with falsy event values return '0'
    2. partitionKey exists with truthy values
        a. if it's string
            - return given string if lenght less than MAX_PARTITION_KEY_LENGTH
            - if greater than return hash of it
        b. if not a string
            - return hash
    3. if doesn't exists or with falsy values
        return hash of event object (output given by crypto module)
2. Next, i started refactoring the code to cover the above statements.
    Details:
        - changed candidate to dpKey as the function named detereministicPartitionKey
        - removed the else statement of assigning the default trivial to initializing it at the top -> for no event based function calls
        - moved the else part of the event.partitionKey to have it's own conditional statement where i will be checking if the partitionKey doesn't exist then returning the hash of the event
        - if partition key exists then check if it's of a type string or not if not then stringifying the partitionKey object and checking if the length exceeds the MAX_PARTITION_KEY_LENGTH if yes returning hash, if not returning the given partitionKey;