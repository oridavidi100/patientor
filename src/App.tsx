import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue } from './state';
import { Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientPage from './components/PatientPage';

const App = () => {
  const [, dispatch] = useStateValue();
  // const [patientList, setpatientList] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [patienId, setpatienId] = useState('');
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            {/* {Object.values(patients).map((patient: Patient) => (
              <Route key={patient.name} exact path={'/' + patient.name} element={<PatientPage name={patient.name} />} />
            ))} */}
            <Route path='/patients/:id' render={() => <PatientPage />} />
            <Route path='/patient'></Route>
            <Route path='/'>
              <PatientListPage />
              {/* setpatienId={setpatienId} */}
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
