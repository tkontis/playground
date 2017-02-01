package string;

import org.junit.Test;

import java.util.Arrays;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static string.Pluralizer.extractSuffix;
import static string.Pluralizer.pluralize;

/**
 * Created by Administrator on 10/4/2016.
 */
public class PluralizerTest {

    private final static String[][] nouns = new String[][]{
    	new String[]{"rabbit", "rabbits", "t"},
    	new String[]{"potato", "potatoes", "o"},
    	new String[]{"cactus", "cacti", "us"},
    	new String[]{"wife", "wives", "fe"},
    	new String[]{"knife", "knives", "fe"},
    	new String[]{"elf", "elves", "f"},
    	new String[]{"roof", "roofs", "f"},
    	new String[]{"phenomenon", "phenomena", "on"},
    	new String[]{"criterion", "criteria", "on"},
    	new String[]{"analysis", "analyses", "is"},
    	new String[]{"ellipsis", "ellipses", "is"},
    	new String[]{"parenthesis", "parentheses", "is"},
    	new String[]{"axis", "axes", "is"},
    	new String[]{"index", "indices", "ex"},
    	new String[]{"matrix", "matrices", "ix"},
    	new String[]{"appendix", "appendices", "ix"},
    	new String[]{"bureau", "bureaux", "eau"},
    	new String[]{"curriculum", "curricula", "um"},
    	new String[]{"memorandum", "memoranda", "um"},
    	new String[]{"stratum", "strata", "um"},
    	new String[]{"datum", "data", "um"},
    	new String[]{"medium", "media", "um"},
    	new String[]{"mouse", "mice", "e"},
    	new String[]{"louse", "lice", "e"},
    	new String[]{"antenna", "antennae", "a"},
    	new String[]{"formula", "formulae", "a"},
    	new String[]{"nebula", "nebulae", "a"},
    	new String[]{"vertebra", "vertebrae", "a"},
    	new String[]{"vita", "vitae", "a"},
    	new String[]{"foot", "feet", "t"},
    	new String[]{"goose", "geese", "e"},
    	new String[]{"tooth", "teeth", "h"},
    	new String[]{"child", "children", "d"},
    	new String[]{"ox", "oxen", "x"},
    	new String[]{"man", "men", "n"},
    	new String[]{"woman", "women", "n"},
    	new String[]{"fish", "fish", "h"},
    	new String[]{"fruit", "fruit", "t"},
    	new String[]{"deer", "deer", "r"},
    	new String[]{"means", "means", "s"},
    	new String[]{"offspring", "offspring", "g"},
    	new String[]{"series", "series", "s"},
    	new String[]{"sheep", "sheep", "p"},
    	new String[]{"species", "species", "s"},
    	new String[]{"ventriloquist", "ventriloquists", "t"}
    };

    @Test
    public void shouldPluralizeIrregulars() {
	Arrays.stream(nouns).forEach(wordEntry->{
	    String singular = wordEntry[0];
	    String plural = wordEntry[1];
	    assertThat(pluralize(singular), equalTo(plural));
	});
    }

    @Test
    public void shouldExtractSuffixes() {
	Arrays.stream(nouns).forEach(wordEntry->{
	    String singular = wordEntry[0];
	    String suffix = wordEntry[2];
	    assertThat(extractSuffix(singular), equalTo(suffix));
	});
    }
}
