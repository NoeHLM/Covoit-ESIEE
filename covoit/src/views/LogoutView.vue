<script>
import { onMounted } from 'vue';
import { useUser } from '@/utils/useUser';
import router from '@/router';

export default {
    name: "LogoutView",
    setup() {
        const { logoutUser } = useUser();
        onMounted(async () => {
            await logoutUser();
            router.push('/login');
        });
    }
};

</script>
