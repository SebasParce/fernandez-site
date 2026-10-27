/**
 * SMS relay for the business number.
 *
 * Customer texts the business number  -> it is forwarded to OWNER_CELL as "+1404...: message".
 * OWNER_CELL texts the business number  -> "+1XXXXXXXXXX your reply" is sent to that customer
 *                                          from the business number.
 * Photos (MMS) are passed along both ways.
 *
 * Setup: set the environment variable OWNER_CELL (e.g. +17865551234) in this Functions service.
 * Requires the business number to be registered for A2P 10DLC, or outbound texts are blocked.
 */
exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const twiml = new Twilio.twiml.MessagingResponse();

  const owner = context.OWNER_CELL;
  const business = event.To;
  const from = event.From;
  const body = (event.Body || '').trim();

  const media = [];
  for (let i = 0; i < Number(event.NumMedia || 0); i++) media.push(event['MediaUrl' + i]);
  const withMedia = media.length ? { mediaUrl: media } : {};

  try {
    if (from === owner) {
      // Reply from the owner: "+14045551234 message" or "404 555 1234 message"
      const m = body.match(/^\s*(\+?1?[\s\-.()]*\d{3}[\s\-.)]*\d{3}[\s\-.]*\d{4})\s+([\s\S]+)$/);
      if (!m) {
        twiml.message('To reply: +1XXXXXXXXXX your message');
        return callback(null, twiml);
      }
      const to = '+1' + m[1].replace(/\D/g, '').slice(-10);
      await client.messages.create({ from: business, to, body: m[2].trim(), ...withMedia });
      twiml.message('Sent to ' + to);
    } else {
      // Message from a customer: forward to the owner's cell
      const text = (from + ': ' + (body || '[photo]')).slice(0, 1500);
      await client.messages.create({ from: business, to: owner, body: text, ...withMedia });
    }
  } catch (err) {
    console.error(err);
    if (from === owner) twiml.message('Could not send: ' + err.message);
  }
  return callback(null, twiml);
};
