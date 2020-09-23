---
title: Few notes about Java clone() method
date: 2013-02-20T00:00:00-05:00
tags:
  - java
---
Did you know you can create new Java instance without constructor? That's right, and this feature is brought to you by the Java clone() method. I personally don't like to use it much because it has many pitfalls, and it feels very broken in many ways. You probably can write better "clone" by using copy constructor or a static copy factory methods.

Anyrate, here is a unit test that highlights few notes I have gathered about Java clone. Look for the "Note" comments below.
```
    package atest;
    
    import org.junit.Test;
    
    import java.util.ArrayList;
    import java.util.List;
    
    import static org.hamcrest.Matchers.hasItems;
    import static org.hamcrest.Matchers.is;
    import static org.junit.Assert.assertThat;
    
    public class CloneTest {
        @Test
        public void testFooClone() throws Exception {
            Foo a = new Foo();
            Foo b = a.clone();
    
            assertThat(a != b, is(true));
            assertThat(a.constructorCallsCount, is(1));
            assertThat(a.name, is("foo"));
            assertThat(b.constructorCallsCount, is(1)); // Note1: Wow, a new instance without calling constructor!
            assertThat(b.name, is("foo"));
    
            a.name = "fooX";
            assertThat(a.name, is("fooX"));
            assertThat(b.name, is("foo"));
    
            Foo2 c = new Foo2();
            c.ids.add("a");
            Foo2 d = c.clone();
            d.ids.add("b");
    
            c.ids.clear();
            c.ids.add("A");
    
            assertThat(c != d, is(true));
            assertThat(c.constructorCallsCount, is(2));
            assertThat(c.name, is("foo"));
            assertThat(d.constructorCallsCount, is(2));
            assertThat(d.name, is("foo"));
    
            assertThat(c.ids, hasItems("A"));
            assertThat(c.ids.size(), is(1));
            assertThat(d.ids, hasItems("a", "b"));
            assertThat(d.ids.size(), is(2));
        }
    
        /** A simple clone examples with simple type fields. */
        public static class Foo implements Cloneable {
            static int constructorCallsCount = 0;
            String name = "foo";
            public Foo() {
                constructorCallsCount++;
            }
            public Foo clone() {
                // Note2: Catch checked exception here so client or subclass doesn't need to.
                Foo result = null;
                try {
                    result = (Foo)super.clone();
                } catch (CloneNotSupportedException e) {
                    throw new RuntimeException("Unable to clone.", e);
                }
                return result;
            }
        }
    
        /** A clone example that needs to fix field afterward super.clone(). */
        public static class Foo2 extends Foo {
            List<String> ids = new ArrayList();
            public Foo2 clone() {
                Foo2 result = (Foo2)super.clone(); // Note3: Some how, super clone will auto return the correct type!
                result.ids = new ArrayList(ids);   // Note4: need to fix non-simple field.
                return result;
            }
        }
    }
``` 
