# 1. Stream:
    Stream yaddaşa yükləmək üçün çox böyük olan dataları idarə etmək üsuludur.Bütün datanı birdən yükləmək əvəzinə onu hissələr şəklində daha kiçik parçalara bölərək istifadə edir.
    Example:    Youtube-ni göstərmək olar. Video açıldıqda bütün video anında yüklənmir, videoya baxıldıqca stream davam edir. 
    
    Niyə əhəmiyyətlidir - Ona görə ki, əgər biz fayla 1 dən 1000000-a qədər ədədləri yazdırmaq istəsək normal qayda olaraq fs modulundan istifadə etməliyik.
    1-ci üsul:
    ```
        (async () => {
            console.time("Writing operation start");
            fs.open(path.join(__dirname, "thirdText.txt"), "w", (err, fd) => {
                for (let i = 0; i < 1000000; i++) {
                fs.write(fd,`${i}`,() => {})
                }
            });
            console.timeEnd("Writing operation end");
        })();
    ```
    Bu kod bloku 2 saniyəyə işini bitirir. Ancaq stream istifadə edərək, daha tez bir şəkildə nəticə əldə edə bilərik.

    2-ci üsul:
    ```
        (async () => {
            console.time("writeMany");
            let fileHandle = await fs.open(path.join(__dirname, "thirdText.txt"), "w");
            let stream = fileHandle.createWriteStream();
            for (let i = 0; i < 1000000; i++) {
                stream.write(`${i}`);
            }
            console.timeEnd("writeMany")
        })();
    ```
    Bu kod blokunu işə saldıqda isə 300ms ərzində işini bitirir.

# 2. RESTful API-nı Node.js istifadə edərək necə yaradırsınız? 
    REST API - Representational State Transfer mənasını verən REST, client ilə server arasında əlaqə yaratmaq üçün bir çox qaydaları müəyyən edən proqram arxitekturasıdır.REST API-nın əsas context-nə HTTP metodu,endpoint,header və body daxildir.
    Günümüzdə Express.js kimi minimalist framework-lərlə və ya daha oturaqlı Nest.js kimi framework-lərlə restful api-lər yaratmaq mümkündür. Nəticə etibarilə heç bir framework istifadə etməyərək də http modulu sayəsində yazmaq olar.

    Example:
    ```
        const http = require('http');

        const server = http.createServer((req, res) => {
            if (req.url === '/api/hello' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Hi, it's a RESTful API');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not found');
            }
        });

        const port = 3000;
        server.listen(port, () => {
            console.log(`Server is working, http://localhost:${port}`);
        });
    ```

##  HTTP Methods:   
        HTTP metodu client-ın servərdə etmək istədiyi action-i müəyyən edir, bura dataların oxunması,yaradılması,silinməsi,update olunması daxildir. Ən çox istifadə olunan methodlar GET,POST,PUT,PATCH və DELETE bunlardır.

# 3. 
## Promise:
    Promise nəticə etibarilə bir işin uğurlu və ya uğursuz olacağını özündə cəmləyir. 3 statusu olur:
    Pending: İlk vəziyyət, hadisə baş verməmişdən əvvəl.
    Resolve: Action uğurla başa çatdıqdan sonra.
    Reject: Əgər action-un baş verən zaman error olubsa, promise uğursuz olur.

    new Promise sətiri ilə promise yaradılıb callback funksiya göndərilərək həmin funksiyanın iki parametri olan resolve ve rejectlə idarə edilir. Resolve uğurlu hallarda reject uğursuz hallarda istifadə olunur. Bir promise return edən funksiyadan işin nəticəsini then (ugurlu hallarda), catch (ugursuz hallarda), finally (butun hallarda) ilə almaq mümkündür. 

    Example: Database-dən data-ları almaq üçün server-ə request göndərilərkən, Promise data-lar qəbul edilənə qədər pending halındadır. Data-lar uğurla qəbul edilsə, o zaman Promise resolve edilmiş və əgər data-lar uğursuz bir şəkildə qəbul edilsə, o zaman Promise rejected halındadır.

## Async/Await:
    Async/Await javascript-də asinxron function-larda promise-lə daha rahat işləmək və daha qısa kod yazmaq üçün istifadə olunur.
    Async və Await keyword-dən istifadə edərək sinxron kod kimi görünən və hərəkət edən asinxron kod yazmağa imkan yaradır.
    Async keyword-ü funksiyanın asinxron olduğunu təyin etmək üçün istifadə olunur. Await keyword-ü Promise yerinə yetirilənə və nəticəni qaytarana kimi gözləməyə məcbur edir.

# 4. Asynchronous Programming in Nodejs:

    Javascript hamının bildiyi kimi single threaded dildir buna görədə bir call stack-ə malikdir. Call Stack execution vaxtı harada olduğumuzu izləmək üçün execution context-lərin üst-üstə yığıldığı yerdir.Call Stack Last in First Out strukturundan istifadə edir yəni call stack-a ilk daxil olan ən son çıxır buda javascriptin single thread dil olduğuna görədir.Call stack funksiyaları ardıcıl olaraq işə salır hazırki funksiyanın işi bitirmədən sonrakı funksiyaya keçmir eyni anda yalnız bir işi görür Synchronos olaraq lakin bu bəzən zərərli ola bilir.
    Example:Buna ən yaxşı nümunə javascriptin alert funksiyasıdır ok düyməsinə click edənə kimi hər şeyi dondurur.

    Asynchronous:Asinxron proqramlaşdırma isə funksiyaların bir-birini gözləmədən eyni vaxtda icra olunmasına icazə verir.Bunu Node js event loop-un köməyi ilə edir.

    Event loop: Node js-də event loop javascript-in single thread olmağına baxmayaraq, node js-ə bloklanmayan və ya paralel action-ları yerinə yetirməyə icazə verir.Node js-də event loop asinxron action-ları Libuv library istifadə edərək yerinə yetirir. Event loop node js-də callbacks functions və ya promises və ya async/await istifadə edərək yazdığımız kodları əsas main thread-də icra etməkdən əvvəl event loop-a gedir.

# 5 React state və props arasındakı fərq:

    State: Reactın developer-leri tərəfindən yaradılan built-in obyektdir. Bu komponentlerin özü tərəfindən idarə olunur. Component öz datalarını yaratmağ və idarə etmək üçün state-dən istifadə edir.React Component-lərin yeniləndiyini state vasitəsilə müəyyən edir.

    Props: Dataların Parent component-dən child componentlərə paylanmasına imkan verir. Props component tərəfindən daxili olaraq dəyişdirilə bilməz, çünki onlar dəyişməzdir.

    Fərqləri:
        State: State yenilənə biləndir mutable,state-də məlumat ötürmək olmaz ancaq data-nı componentdə saxlayır,state həm readable həmdə writable.
        Props: Yalnız oxuna bilən componentdir immutable,props istifadə edərək dataları bir componentdən digərinə ötürə bilərik,props yalnız readable olur.

# 6 High-Order Components:
    High Order Components: Bir componenti alır və yeni bir componenti geri qaytaran funksiyadır.Eyni funksionallığı daşıyan birdən çox komponent varsa burda high order component istifadə edərək daha az təkrarlama və daha optimal kod təqdim edir.

    Example:
    ```
        function ClickIncremented(props) {
            const { counter, incrementedCounter } = props;
            return (
                <div>
                    <button onClick={() => incrementedCounter()}>Incremented counter</button>
                    <p> Value of 'counter' in ClickIncremented: {counter}</p>
                </div>
            );
        }

        export default UpdatedComponent(ClickIncremented, 10);

        function HoverIncremented(props) {
            const { counter, incrementedCounter } = props;
            return (
                <div>
                    <button onClick={() => incrementedCounter()}>Incremented counter</button>
                    <p> Value of 'counter' in HoverIncremented: {counter}</p>
                </div>
            );
        }
        
        export default UpdatedComponent(HoverIncremented, 3);

        /*  High Order Components */
        const UpdatedComponent = (OriginalComponent, incrementedCount) => {
            function NewComponent(props) {
                const [counter, setCounter] = useState(10);
                return (
                <OriginalComponent
                    counter={counter}
                    incrementedCounter={() => setCounter((size) => size + incrementedCount)}
                />
                );
            }
            return NewComponent;
        };
    ```
# 7 React Lifecycle methods:
    Life cycle metodlarının 3 növü vardır:
        Mounting: Componentin ilkin mərhələsi başa çatdıqda və component DOM-a daxil olanda və veb-də ilk dəfə göstərildikdə        mounting mərhələsi olur.
        - componentDidMount(): Component DOM-a daxil oluqda ardından bu funksiya işə salınır, yəni render() funksiyası ilk dəfə yerinə yetirildikdən sonra 1 dəfə işə salınır.
            Example:
            ```
                /* Class component */
                    async componentDidMount() {
                        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                        const json = await response.json();
                        this.setState({ data: json });
                    }
                
                /* Function component use hooks */

                useEffect(() => {
                    (async () => {
                        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                        const json = await response.json();
                        setData(json);
                    })()
                },[])
            ```
        Updating: Bu proses componentdə state update və ya props dəyişdikdə baş verir və component DOM-da yenilənməlidir.
        - componentDidUpdate(): Bu lifecycle method-u yenilənmə baş verən kimi çağırılır və çox vaxt state props dəyişikliyində istifadə olunur.
            Example:
                ```
                    /* Class component */
                        componentDidUpdate(prevProps,prevState) {
                            if (prevState.data !== this.state.data) {
                                console.log('data state has changed.')
                            }
                        }
                    
                    /* Function component use hooks */
                    
                    useEffect(() => {
                        (async () => {
                            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                            const json = await response.json();
                            setData(json);
                        })()
                    },[dependency])
                ```
        Unmounting: Bu componentin DOM-dan çıxarılması zamanı və ya əlaqə qura bilmədiği vaxtda işə salınan prosesdir.
            -componentWillUnmount(): Bu method, componentin DOM-dan çıxarılmasından bir az əvvəl call olunur. Bu da clean up dediyimiz prosesdir. Məsələn: eventlərin silinməsi və ya time,intervalın təmizlənməsi.
                Example:
                ```
                    /* Class component */
                    componentWillUnmount() {
                        document.removeEventListener("mousemove",this.moveFunction)
                    }

                    /* Function component use hooks */
                    
                    useEffect(() => {
                        window.addEventListener("mousemove", () => {});
                        return () => {
                            window.removeEventListener("mousemove", () => {})
                        }
                    }, []);
                ```

# 8 Express Middleware:
    Middleware: Middleware response göndərən controller action-dan əvvəl və server client-dan request aldıqdan sonra bəzi kodu yerinə yetirməkdir. Ən böyük üstünlüyü odur ki, middleware functionları response və request variable output-larına sahibdir və onları dəyişdirə və ya lazım olduqda istifadə edə bilər.Middleware function-ları həmçinin next function olan üçüncü parametrə sahibdir. Bu funksiya vacibdir, ona görə ki,next middleware-ın yerinə yetirilməsi üçün o, middleware-dən çağırılmalıdır.Bu function çağırılmırsa, controller action da daxil olmaqla digər middleware-ların heç biri çağırılmayacaq.

    Middleware strukturu necə genişləndirilər?
    app.use() built-in middlewaredir nodejs tərəfindən yaradılıb və biz bundan istifadə edərək app səviyyəsində middleware yaradabilərik. Bu middleware bütün app-ə daxildir.

    ```
        const express = require("express")
        const app = express()

        app.use(loggingMiddleware)

        app.get("/", (req, res) => {
            res.send("Home Page")
        })

        app.get("/users", (req, res) => {
            res.send("Users Page")
        })

        function loggingMiddleware(req, res, next) {
            console.log("Inside Middleware")
            next()
        }
    ```

    Öz middleware'inizi necə yarada bilərsiniz?

    ```
        /* Bu üsul Router-level middleware-dir.

        const express = require("express")
        const app = express()

        app.get("/", (req, res) => {
            res.send("Home Page")
        })

        app.get("/users", authorizeUsersAccess, (req, res) => {
            res.send("Users Page")
        })

        function authorizeUsersAccess(req, res, next) {
            console.log("authorizeUsersAccess Middleware")
            next()
        }

    ```

    Built-in middleware

    ```
        /* Bu əvvəlcədən developerlər tərəfindən yazılmış hazır middlewaredir.

        const express = require("express")
        const app = express()

        app.use(express.json()) 
    ```

    Real example:
    
    Düşünək ki, biz veb serverə gələn hər sorğuda onu müəyyən filterlərdən keçirərək yoxlamaq istəyirik. Məsələn request header-də bearer token var mı? varsa doğrudur mu? Bunun üçün route ilə metod arasına bir auth middleware-i əlavə edə bilərik.
    ```
        auth.middleware.js

        const jwt = require("jsonwebtoken");

        module.exports = (req, res, next) => {
            try {
                const token = req.header("x-auth-token");
                if (!token) return res.status(403).send("Giriş qadağandır.");

                const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
                req.user = decoded;
                next();
            } catch (error) {
                res.status(400).send("Invalid token");
            }
        };

        route.js

        const auth = require("../middleware/auth");

        router.get("/me", auth, async (req, res) => {
            try {
                const user = await User.findById(req.user.id).select("-password -_v");
                res.send(user);
            } catch (error) {
                console.log(error);
                res.send("An error occured");
            }
        });

        module.exports = router;
    ```

# 10 Redux-in əvəzinə React'ta Context API və Hooks ilə necə böyük miqyasda bir tətbiq idarə edilir?
    Context API:  Context API, propsları ötürmədən dataları komponentlər arasında paylaşmağa imkan verən React methodu-dır və məşhur prop drilling-dən bunun context istifadə edərək qaçınırıq. O, ötürmək istədiyimiz dataları saxlayan context obyekti yaratmaqla və sonra ona daxil olmaq üçün lazım olan komponentləri bağlamaq üçün provayder komponentindən istifadə etməklə işləyir. Sonra, contextdən dataları əldə etmək üçün consumer komponentindən və ya hookdan istifadə edə bilərik. Context API mövzular, dillər və ya istifadəçi məlumatı kimi bir çox komponentlər üçün ümumi olan məlumatları ötürmək üçün faydalıdır. Context API theme,language və ya user information kimi bir çox componentlər üçün ümumi olan dataları ötürmək üçün əlverişlidir.
    Context API Redux ilə müqayisədə çox yaxşı görünməyə bilər. Lakin useReducer Hook-la birləşdirildikdə global state management problemini həll edə bilərik. React Hook function component istifadə edərək state və lifecycle methodlarını yerinə yetirməyə imkan verir.
    
    useReducer: useReducer() Hook usestate kimi state-ləri saxlamaq və onları update etmək üçün istifadə olunur. Bu javascriptdə reducer() methodu kimi useReducer hookda argument olaraq, reducer function və initial state kimi iki value alır. useReducer current state-i və actionu ötürə və sonra onu işə salan dispatch functionu geri qaytarır.

    Nəticədə biz Context API və useReducer Hook-u birləşdirərək optimal qlobal state managementi yerinə yetirə bilərik.

# 11 React'ta Server-Side Rendering (SSR) və Client-Side Rendering (CSR) arasındakı fərqlər
###    Client-Side Rendering (CSR): 
        CSR, Client Side Rendering, sorğunun brauzer tərəfində render edilməsidir. Beləliklə, server tərəfində daha az yük olur. Google Client Side Rendering ilə sayta baxarkən o, təxminən aşağıdakı kimi davam edir.

        1. HTML faylı endirilir.
        2. Məzmun oxunur, eyni zamanda səhifə daxilindəki keçidlər vasitəsilə digər səhifələr də oxunur.
        3.Məzmunun əksəriyyəti JS olduğundan, JS resursları endirilir və məzmunu oxunmaq və göstərilmək üçün növbəyə qoyulur.
        4. CSS endirilir və məzmunu oxunur.
        5. Məzmunu oxunan JS təqdim olunur və nəticə əldə edilir.
        6. Bütün endirilmiş fayllar indeksləşdirmə üçün Google Indexer-ə yönləndirilir.

        Üstünlükləri nələrdir?
        CSR, unikal istifadəçi təcrübəsi təklif edir. Çünki sorğuların əksəriyyəti brauzer tərəfində həll olunacaq. Bu da ani məlumat axınına ehtiyacı olan sistemlərdə tez-tez istifadə olunur (mərc oyunları, birja və s.)

        TTFB SSR-dən daha sürətlidir. Serverdə daha az yük olur.

        Mənfi cəhətləri nələrdir?
        Bütün səhifələr Single Page Application (SPA) məntiqində yaradılacağı üçün Googlebot oxumaqda çətinlik çəkə bilər.

###     Server-Side Rendering (SSR):
        SSR Server Side Rendering, server tərəfində olan renderə deyilir. Yəni sorğu göndərildikə sorğu server tərəfində işlənir, kodlar tərtib edilir və nəticə brauzerə ötürülür. Google Server Side Rendering ilə saytı skan edərkən, təxminən aşağıdakı kimi irəliləyir:

        HTML faylı endirilir.
        Məzmun oxunur, eyni zamanda səhifə daxilindəki keçidlər vasitəsilə digər səhifələr də oxunur.
        CSS və JS yüklənir və məzmunu oxunur.
        Bütün endirilmiş fayllar indeksləşdirmə üçün Google Indexer-ə yönləndirilir.
        Üstünlükləri nələrdir?
        SSR-in ən mühüm üstünlüyü SEO dostu (SEO friendly) yanaşmadır. Çünki bütün səhifələr ayrı-ayrılıqda render edilir və botlara təqdim edilir.

        Mənfi cəhətləri nələrdir?
        SSR, CSR kimi interaktiv deyil. Məsələn, birja kimi (hər saniyə dəyişiklik oluna bilən) saytlarda CSR qədər effektiv deyil.

        Bundan əlavə, server tərəfində yük olacağı üçün ilkin yükün TTFB CSR-dən daha yüksək olacağı gözlənilir.

        TTFB nədir?:
        Time to first byte (TTFB), bir web serverin clientdən gələn HTTP istəklərinə hansı müddətdə cavab verdiyini ölçən metrikaya verilən addır. TTFB ilə hər hansı bir clientin serverə göndərdiyi HTTP istəyi sonrası istək göndərən səhifənin ilk byte-in (məlumat) cavab olaraq clientə (brauzer) göndərdiyi müddət ölçülür.