import java.util.Scanner;

public class DayOfProgrammer {
    interface LeapYear {
	boolean isLeapYear(int y);
    }

    enum Calendar implements LeapYear {
	JULIAN {
	    public boolean isLeapYear(int y) {
		return y % 4 == 0;
	    }
	},
	GREGORIAN {
	    public boolean isLeapYear(int y) {
		return y % 400 == 0 || (y % 4 == 0 && y % 100 != 0);
	    }
	};

	static public Calendar getCalendar(int y) {
	    return y <= 1917 ? Calendar.JULIAN : Calendar.GREGORIAN;
	}

    }

    public static String getDayOfProgrammer(int y) {
	String dop = "";
	Calendar cal = Calendar.getCalendar(y);
	if (cal.isLeapYear(y)) {
	    //TODO
	} else {
	    //TODO
	}
	return dop;
    }

    public static void main(String[] args) {
	Scanner in = new Scanner(System.in);
	int y = in.nextInt();
	// your code goes here
	System.out.println(getDayOfProgrammer(y));
    }
}
