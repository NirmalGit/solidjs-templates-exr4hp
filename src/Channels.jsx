import { createSignal, onMount } from 'solid-js';

const channels = [
  {
    id: 1,
    name: 'Live News',
    programs: [
      {
        time: '8:00pm',
        title: 'The House That Made Me',
        details: 'Description',
      },
      {
        time: '9:00pm',
        title: 'The Royal Variety Performance 2010',
        details: 'Description',
      },
      { time: '10:00pm', title: 'NCIS', details: 'Description' },
    ],
  },
  {
    id: 2,
    name: 'Featured',
    programs: [
      { time: '8:00pm', title: 'BBC News at Ten', details: 'Description' },
      { time: '9:00pm', title: "Dale's Great Getaway", details: 'Description' },
      { time: '10:00pm', title: 'Celebrity Gogglebox', details: 'Description' },
    ],
  },
];

function Channels() {
  const [selectedChannel, setSelectedChannel] = createSignal(null);
  const [posts, setPosts] = createSignal([]);

  onMount(async () => {
    const response = await fetch(
      'https://sp-stg-new-api.aws.playco.com/api/v1.1/epg/category/events/92f791cb77094c049feaf5b71c332859-sp?category=live-news,featured,sports,religious,playlist,lifestyle,testing2,svod,avod,svodavod,regression-category,drama,kids,factual,testing,entertainment&ts_start=1719271800&ts_end=1719354600&lang=en&profileType=EV&x-geo-country=AE&pg=18&page=1&limit=500'
    );
    const data = await response.json();
    console.log(data);
    // setPosts(data);
  });

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', borderRight: '1px solid #000' }}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              style={{
                cursor: 'pointer',
                padding: '10px',
                borderBottom: '1px solid #ddd',
              }}
              onClick={() => setSelectedChannel(channel)}
            >
              {channel.name}
            </div>
          ))}
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          {selectedChannel() ? (
            <div>
              <h2>{selectedChannel().name}</h2>
              <ul>
                {selectedChannel().programs.map((program) => (
                  <li key={program.time}>
                    <strong>{program.time}</strong> - {program.title}:{' '}
                    {program.details}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>Select a channel to see the programs</div>
          )}
        </div>
      </div>
      <div class="container">
        <h1 class="my-4">Posts</h1>
        <div class="row">
          {posts().map((post) => (
            <div class="col-md-4" key={post.id}>
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">{post.title}</h5>
                  <p class="card-text">{post.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Channels;
