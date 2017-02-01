import math.Fibonacci;
import org.junit.Assert;
import org.junit.Test;

public class FibonacciTest {

    @Test
    public void testFibonacciGenerator() {
        int[] fibFirstMembers = {1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765};
        Assert.assertArrayEquals(fibFirstMembers, Fibonacci.getFibonacci(fibFirstMembers.length));
    }
}