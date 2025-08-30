import os 

def run_test_cases(
    file_path: str,
    test_case_1: tuple,
    test_case_2: tuple,
    expected_output_1,
    expected_output_2
):
    # Read the function definition from the file
    with open(file_path, "r") as file:
        code_to_test = file.read()

    # Store a copy of existing functions before execution
    before_exec = set(globals().keys())

    # Execute the provided function definition
    exec(code_to_test, globals())

    # Find the newly added function
    new_functions = set(globals().keys()) - before_exec

    if not new_functions:
        raise RuntimeError("No function was defined in the provided file.")

    function_name = next(iter(new_functions))  # Extract function name dynamically
    function_to_test = globals()[function_name]  # Get the function reference

    # Dynamic test cases (Always 2)
    testing_data = [test_case_1, test_case_2]
    expected_output = [expected_output_1, expected_output_2]

    # Convert test cases dynamically
    test_cases = list(zip(testing_data, expected_output))

    results = []  # Store results

    # Run exactly two test cases
    for test_input, expected in test_cases:
        try:
            result = function_to_test(*test_input)  # Unpacking for dynamic arguments
            assert result == expected, f"❌ Test case failed: {function_name}{test_input} should return {expected}, but got {result}"
            results.append(f"✅ Test case passed: {function_name}{test_input} = {result}")
        except AssertionError as e:
            results.append(f"❌ {e}")

    return results  # Return list of results


if __name__ == "__main__":
    # File containing the function definition
    json_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "test_case"))
    file_path = os.path.join(json_dir, "test_case.txt")

    # Define test cases and expected outputs
    test_case_1 = (153,)  # Pyramid with 3 rows # Expected pyramid output~

    test_case_2 = (51,)  # Pyramid with 5 rows
    expected_output_2 = "    * \n   * * \n  * * * \n * * * * \n* * * * *"

    results = run_test_cases(file_path, test_case_1, test_case_2, True, False)

    # Print the results
    for res in results:
        print(res)