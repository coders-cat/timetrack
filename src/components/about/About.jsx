/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Content } from 'react-bulma-components';

const About = () => {
  return (
    <Content>
      <p>
        As a freelancer I have to switch between projects and tasks all the time, for a variety of
        reasons. With so many leaps, at the end of the month it's a nightmare to detail the hours
        spent on projects to bill each client.
      </p>
      <p>
        After searching a bit and trying various applications and websites to track tasks times, I
        saw that they were very complex for my use case, you had to put a lot of data, have to
        register and some of them even wanted to charge you (to give them the data of your clients
        and projects ... almost nothing.), so you completely lost control of your data.
      </p>
      <p>
        This is why I decided to make this simple application that "works for me" in which you add a
        client and project (two text fields), and you have a switch to start or stop the meter and
        also ensures that there is only one project tracking at any time. Just set the range of
        dates where you want to see the result (billing period) and <em>voila</em>. Since there are
        projects that I work on very little over the month, I added the option to hide some of them
        to not disturb (remember to show them before invoicing!).
      </p>
      <p>
        This website does NOT use cookies or any other tracking technique. All your data is stored
        in the indexedDB of your browser and never under any circumstances are transferred anywhere
        and never will be.
      </p>
      <p>
        Therefore, if you change your browser or device, it will be completely empty, this is why
        tools are provided for exporting and importing the database, and it's the user's
        responsibility, and in fact recommended, to make regular exports and save them in safe
        place.
      </p>
      <p>This is why webapp can work completely offline.</p>
      <p>
        You don't even need to keep the window open, when you start the counter a "work unit" with
        the start timestamp is saved, when you stop it the end date is updated, then it will appear
        on the list that opens clicking on the name of the project. As you can see they can be
        deleted or edited, which I often do to discount lunch time or adjust some time when I forget
        to stop at the end of the day...
      </p>
      <p>
        The source code of this project is released under the{' '}
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          GPLv3
        </a>{' '}
        license and you can access it here:{' '}
        <a href="https://github.com/coders-cat/timetrack" rel="noopener noreferrer" target="_blank">
          https://github.com/coders-cat/timetrack
        </a>
        .
      </p>
      <h4>Disclaimer:</h4>
      <p>
        THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN
        OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM
        “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
        LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE
        PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR
        CORRECTION.
      </p>
    </Content>
  );
};

export default About;
